const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { getItems, addItem, editItem, deleteItem } = require('../controllers/crudController');
import {Request, Response} from 'express'

const router = express.Router();

router.all('/', async(req: Request, res: Response)=>{
      const { action } = req.query;
      console.log(req.query)
  
switch (action) {
    case "getItems":
      getItems(req, res);
      return;
    case "createItem":
      addItem(req, res);
      return;
    case "editItem":
      editItem(req, res);
      return;
    case "deleteItem":
      deleteItem(req, res);
      return;
    case "login":
      login(req, res);
      return;
    case "logout":
      logout(req, res);
      return;
    case "register":
      register(req, res);
      return;
    default:
      res.status(400).json({ error: "Invalid action" });
      return;
  }
})

module.exports = router;