"use strict";

const express = require("express");
const commentController = require("../../controllers/comment.controller");

const { authenticationV2 } = require("../../auth/authUtils");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();

// authentication
router.use(authenticationV2);
// =========================
router.post("", asyncHandler(commentController.createComment));
router.delete("", asyncHandler(commentController.deleteComment));
router.get("", asyncHandler(commentController.getCommentsByParentId));

// query //

module.exports = router;
