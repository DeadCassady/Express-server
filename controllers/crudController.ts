const Item = require('../models/List');
const fs = require('fs')
import {Request, Response} from 'express'
const tasks = {
  "items": []
};


exports.getItems = async (req: Request, res: Response) => {
  try {
        const items = await Item.find()
      .find()
        tasks.items = items
        res.json(tasks);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
};

exports.addItem = async (req: Request, res: Response) => {
    let lastId= fs.readFileSync('variable.txt', 'utf8')
  try{
    const item = new Item({
      id: lastId,
      text: req.body.text,
      checked: false
    })
    const newItem = await item.save()
    lastId++
    fs.writeFileSync('variable.txt', `${lastId}`, 'utf8')
    res.status(201).json(newItem)
  }catch(error){
    console.error("Error saving items:", error)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.editItem = async (req: Request, res: Response) => {
    try {
     const item = await Item.findOne({
      id: req.body.id,
      text: req.body.text,
      checked: req.body.checked
     })

      if(item){
        res.json({ ok: true});
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false});
    }
};
exports.deleteItem = async (req: Request, res: Response) => {
    
    try{  
    await Item.find({
      id: req.body.id
    }).deleteOne()

    res.json({"ok" : true})

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
  };