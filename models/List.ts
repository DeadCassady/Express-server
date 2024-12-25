const mongoose = require('mongoose');
 const listSchema = new mongoose.Schema({  
        id: {type: Number, required: true},
        text: {type: String, required: true},
        checked: {type: Boolean, required: true}
    
  })
   
module.exports = mongoose.model('item', listSchema, 'items')