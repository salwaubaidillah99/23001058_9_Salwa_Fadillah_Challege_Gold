const itemData = require("../database/dbItem.json");
const { formatResponse } = require("../reponse/response.js");
const fs = require("fs");

class ItemController {
  static getItemAll(req, res) {
    return res.status(200).json(formatResponse(itemData));
  }

  static getItemById(req, res) {
    let statusCode = 200;
    let message = undefined;
    const item = itemData.find((item) => item.idItem === +req.params.idItem);

    if (item === undefined) {
      statusCode = 404;
      message = `Item with ID ${req.params.idItem} not found!`;
    }
    return res.status(statusCode).json(formatResponse(item, message));
  }

  static addItem(req, res) {
    let { itemName, descripsi, price, qty } = req.body;
    let idItem = itemData[itemData.length - 1].idItem + 1;
    let Item = {
      idItem: idItem,
      itemName: itemName,
      descripsi: descripsi,
      price: price,
      qty: qty,
    };
    itemData.push(Item);
    fs.writeFileSync(
      "./database/dbItem.json",
      JSON.stringify(itemData),
      "utf-8"
    );
    res.status(200).json(formatResponse(Item));
  }

  static updateItem(req, res) {
    let idItem = +req.params.idItem;
    let statusCode = 200;
    const item = itemData.find((item) => item.idItem === +idItem);
    if (item === undefined) {
      statusCode = 404;
      message = `Post with ID ${idItem} not found!`;
      return res.status(statusCode).json(formatResponse(item, message));
    }
    let { itemName, descripsi, price, qty } = req.body;
    item.itemName = itemName ? itemName : item.body;
    item.descripsi = descripsi ? descripsi : item.body;
    item.price = price ? price : item.body;
    item.qty = qty ? qty : item.body;

    for (let i = 0; i < itemData.length; i++) {
      if (itemData[i].idItem === idItem) {
        itemData[i] = item;
        break;
      }
    }
    fs.writeFileSync(
      "./database/dbItem.json",
      JSON.stringify(itemData),
      "utf-8"
    );
    return res.status(statusCode).json(formatResponse(item));
  }

  static deleteItem(req, res) {
    let itemId = parseInt(req.params.idItem);
    let itemIndex = itemData.findIndex((item) => item.idItem === itemId);
    if (itemIndex === -1) {
      const response = formatResponse(null, "User not found");
      return res.status(404).json(response);
    }
    let deletedItem = itemData.splice(itemIndex, 1)[0];
    fs.writeFileSync(
      "./database/dbItem.json",
      JSON.stringify(itemData),
      "utf-8"
    );
    const response = formatResponse(deletedItem, "Data Delete successfully");
    return res.json(response);
  }
}

module.exports = { ItemController };
