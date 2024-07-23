"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { createKeyToken } = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getDataInfo } = require("../utils");
const {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
} = require("../core/error.response");
const { findByEmail } = require("./shop.service");
const KeyTokenService = require("./keyToken.service");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static logout = async ( keyStore ) => {
    const delKey = await KeyTokenService.removeKeyById(keyStore._id)
    console.log({delKey})
    return delKey
  }

  static login = async ({ email, password, refreshToken = null }) => {
    /*
      1 - check email in dbs
      2 - match password
      3 - create AT, RT and save
      4 - generate tokens
      5 - get data return 
    */

    // 1
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered!");
    // 2
    const match = await bcrypt.compareSync(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication error");
    //3
    const publicKey = crypto.randomBytes(64).toString("hex");
    const privateKey = crypto.randomBytes(64).toString("hex");

    const { _id: userId } = foundShop;
    // 4
    const tokens = await createTokenPair(
      { userId, email },
      publicKey,
      privateKey
    );

    await KeyTokenService.createKeyToken({
      refreshToken: tokens.refreshToken,
      publicKey,
      privateKey,
      userId,
    });

    return {
      shop: getDataInfo({
        fileds: ["_id", "name", "email"],
        object: foundShop,
      }),
      tokens,
    };
  };

  static signUp = async ({ name, email, password }) => {
    // check email exist
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new ConflictRequestError("Error: Shop already registered!");
    }

    const passwordHash = await bcrypt.hashSync(password, 10);
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      roles: [RoleShop.SHOP],
    });

    if (newShop) {
      const publicKey = crypto.randomBytes(64).toString("hex");
      const privateKey = crypto.randomBytes(64).toString("hex");

      console.log({ publicKey, privateKey });
      const keyStore = await createKeyToken({
        userId: newShop._id,
        publicKey,
        privateKey,
      });

      if (!keyStore) {
        throw new BadRequestError("Key token error!");
      }

      const tokens = await createTokenPair(
        { useId: newShop._id, email },
        publicKey,
        privateKey
      );

      console.log(`Created token success::`, tokens);

      return {
        metadata: {
          shop: getDataInfo({
            fileds: ["_id", "name", "email"],
            object: newShop,
          }),
          tokens,
        },
      };
    }

    return {
      metadata: null,
    };
  };
}

module.exports = AccessService;
