const { inventory } = require("../inventory.model")

const insertInventory = async({ productId, shopId, stock, location = 'unknow'}) => {
  return await inventory.create({
    inven_productid: productId,
    inven_stock: stock,
    inven_location: location,
    inven_shopId: shopId
  })
}

module.exports = {
  insertInventory
}