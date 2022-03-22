const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    make: String,
    model: String
})

module.exports =mongoose.model("Car", carSchema);