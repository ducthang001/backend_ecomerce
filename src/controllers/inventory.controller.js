"use strict";

const { SuccessResponse } = require("../core/success.response");
const InventoryService = require("../services/inventory.service");
class InventoryController {
  addStockToInventory = async (req, res, next) => {
    // new
    new SuccessResponse({
      message: `Create new Cart addStockToInventory`,
      metadata: await InventoryService.addStockToInventory(req.body),
    }).send(res);
  };
}

module.exports = new InventoryController();
