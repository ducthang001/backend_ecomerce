"use strict";

const express = require("express");
const accessController = require("../../controllers/access.controller");
const { apiKey, permission, asyncHandle } = require("../../auth/checkAuth");
const { authentication, authenticationV2 } = require("../../auth/authUtils");
const router = express.Router();

// check apikey
// router.use(apiKey);
// check permission
// router.use(permission("0000"));

router.post("/shop/signup", asyncHandle(accessController.signUp));
router.post("/shop/login", asyncHandle(accessController.login));

// authentication
router.use(authenticationV2)
// =========================
router.post("/shop/logout", asyncHandle(accessController.logout));
router.post("/shop/handlerRefreshToken", asyncHandle(accessController.handlerRefreshToken));

module.exports = router;
