'use strict'

const _ = require('lodash')
const getDataInfo = ({fileds = [], object = {}}) => {
  return _.pick(object, fileds)
}

module.exports = {
  getDataInfo
}