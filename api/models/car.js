const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    make: {
        type: String, 
        required: true
    },
    model: {
        type: String, 
        required: true
    },
})

module.exports =mongoose.model("Car", carSchema);