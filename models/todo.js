const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
   text: {
       type: String,
       required: [true, "Todo text must be provided"],
       maxlength: [50, "Todo text must be less than 50 characters"],
   }, 
   completed: {
       type: Boolean, 
       required: [true, "Is your task completed?"],
   },
   author: {
       type: mongoose.Types.ObjectId,
       ref: "User",
   }
});

module.exports = mongoose.model("Todo", TodoSchema);