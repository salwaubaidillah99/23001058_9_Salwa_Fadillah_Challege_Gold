const express = require("express");
const itemRouter = express.Router();

const { formatResponse } = require("../reponse/response.js");
let { item } = require("../database/dbItem.js");

itemRouter.get("/:itemId", (req, res) => {
  let data = {};
  let message = "success";
  let isItemFound = false;

  let idItem = req.params.itemId;
  for (let i = 0; i < item.length; i++) {
    if (item[i].idItem === +idItem) {
      data = item[i];
      isItemFound = true;
      break;
    }
  }

  if (isItemFound) {
    res.status(200).json(formatResponse(data, message));
  } else {
    res.status(400).json(formatResponse(data, "Item  with id ${id} not found"));
  }
});

itemRouter
  .route("/")
  .get((req, res) => {
    let message = "successfully displays all item data";
    res.status(200).json(formatResponse(item, message));
  })
  .post((req, res) => {
    let data = {
      idItem: item[item.length - 1].idItem + 1,
      item: req.body.item,
      descripsi: req.body.descripsi,
      harga: req.body.harga,
      qty: req.body.qty,
    };
    item.push(data);
    res.status(201).json(formatResponse(data, "successfully added item data"));
  });

module.exports = itemRouter;
