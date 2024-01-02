const express = require("express");
const itemRouter = express.Router();

const { formatResponse } = require("../reponse/response.js");
const itemData = require("../database/dbItem.json");
const { ItemController } = require("../controller/itemController.js");
const fs = require("fs");

itemRouter.route("/item/getItemAll/").get(ItemController.getItemAll);
itemRouter.route("/item/getItemById/:idItem").get(ItemController.getItemById);
itemRouter.route("/item/AddItem/").post(ItemController.addItem);
itemRouter.route("/item/updateItem/:idItem").put(ItemController.updateItem);
itemRouter.route("/item/deleteItem/:idItem").delete(ItemController.deleteItem);

module.exports = { itemRouter };
