'use strict'

const { SuccessResponse } = require("../core/success.response")
const { createComment, getCommentsByParentId, deleteComment } = require("../services/comment.service")

class CommentController {
  createComment = async (req, res, next) => {
    new SuccessResponse({
      message: "create new comment",
      metadata: await createComment(req.body),
    }).send(res);
  };

  deleteComment = async (req, res, next) => {
    new SuccessResponse({
      message: "delete comment",
      metadata: await deleteComment(req.body),
    }).send(res);
  };

  getCommentsByParentId = async (req, res, next) => {
    new SuccessResponse({
      message: "get comment by parent id",
      metadata: await getCommentsByParentId(req.query),
    }).send(res);
  };
}

module.exports = new CommentController()