'use strict'
const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler');
const { AuthFailureError, NotFoundError } = require('../core/error.response');
const { findByUserId } = require('../services/keyToken.service');

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '2 days'
    })

    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    JWT.verify(accessToken, publicKey, (error, decode) => {
      if(error) {
        console.log(`Error verify::`, error)
      } else {
        console.log(`Decode verify::`, decode)
      }
    })

    return {accessToken, refreshToken}
  } catch (error) {
    
  }
}

const authentication = asyncHandler( async (req, res, next) => {
  /*
    1 - check userId missing??
    2 - get access token
    3 - verify token
    4 - check user in dbs
    5 - check keystore with this userId
    6 - OK all -> return next
  */

  // 1
  const userId = req.headers[HEADER.CLIENT_ID]
  if(!userId) throw new AuthFailureError('Invalid Request')

  // 2
  const keyStore = await findByUserId( userId )
  if(!keyStore) throw new NotFoundError('Not found keystore')
  // 3
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if(!accessToken) throw new AuthFailureError('Invalid Request')
  
  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
    if(userId !== decodeUser.userId) throw new AuthFailureError('Invalid UserId')
      req.keyStore = keyStore
      return next()
  } catch (error) {
    throw error
  }
})

module.exports = {
  createTokenPair,
  authentication
}