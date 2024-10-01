"use strict";

const express = require("express");

const asyncHandler = require("../../helpers/asyncHandler");
const inventoryController = require("../../controllers/inventory.controller");
const { authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();
router.use(authenticationV2)
router.post('', asyncHandler(inventoryController.addStockToInventory))

module.exports = router