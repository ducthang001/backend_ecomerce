'use strict'
const { apiKey, permission } = require("../auth/checkAuth");
const express = require('express')
const router = express.Router()

// check apikey
router.use(apiKey);
// check permission
router.use(permission("0000"));

router.use('/v1/api', require('./access'))
router.use('/v1/api/product', require('./product'))

module.exports = router