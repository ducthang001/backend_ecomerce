"use strict";

const express = require("express");

const asyncHandler = require("../../helpers/asyncHandler");
const cartController = require("../../controllers/cart.controller");

const router = express.Router();

router.post('', asyncHandler(cartController.addToCart))
router.delete('', asyncHandler(cartController.delete))
router.post('/update', asyncHandler(cartController.update))
router.get('', asyncHandler(cartController.listToCart))

module.exports = router