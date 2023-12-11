const express = require("express");
const itemRouter = express.Router();
const { formatResponse } = require("../reponse/response.js");
let { item } = require("../database/dbItem.js");

itemRouter
  //Menampilkan Semua Data Item//
  .get("/getItemAll/", (req, res) => {
    let message = "successfully displays all item data";
    res.status(200).json(formatResponse(item, message));
  })
  //Menambahkan Data Item//
  .post("/setItem/", (req, res) => {
    let data = {
      idItem: item[item.length - 1].idItem + 1,
      itemName: req.body.item,
      descripsi: req.body.descripsi,
      harga: req.body.harga,
      qty: req.body.qty,
    };
    item.push(data);
    res.status(201).json(formatResponse(data, "successfully added item data"));
  })
  //Menampilkan data Item ById//
  .get("/getItemById/:itemId", (req, res) => {
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
      res
        .status(404)
        .json(formatResponse(data, `Item with id ${id} not found`));
    }
  })
  //Menghapus Data Item//
  .delete("/deleteItems/:itemId", (req, res) => {
    let idItem = parseInt(req.params.itemId);
    let data = item.findIndex((item) => item.idItem === idItem);

    if (data !== -1) {
      let deleteItem = item.splice(data, 1)[0];
      res.status(200).json(formatResponse(deleteItem, "Success delete item"));
    } else {
      res.status(404).json(formatResponse(null, "item not found"));
    }
  })
  //Update Data Item //
  .put("/updateItems/:id", (req, res) => {
    let itemId = parseInt(req.params.id);
    let { itemName, descripsi, price, qty } = req.body;
    let data = item.findIndex((item) => item.idItem === itemId);

    if (data !== -1) {
      item[data].itemName = itemName || item[data].itemName;
      item[data].descripsi = descripsi || item[data].descripsi;
      item[data].price = price || item[data].price;
      item[data].qty = qty || item[data].qty;

      res
        .status(200)
        .json(formatResponse(item[data], "Successfully updated item"));
    } else {
      res.status(404).json(formatResponse(null, "Item not found"));
    }
  });

module.exports = itemRouter;
