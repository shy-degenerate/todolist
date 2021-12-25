const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
   text: {
       type: String,
       required: [true, "todo text must be provided"],
       maxlength: [300, "todo text must be less than 300 characters"],
   }, 
   completed: {
       type: Boolean, 
       required: [true, "is your task completed?"],
   },
   author: {
       type: mongoose.Types.ObjectId,
       ref: "User",
   }
});

module.exports = mongoose.model("Todo", TodoSchema);