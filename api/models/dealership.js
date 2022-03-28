const mongoose = require("mongoose");

const dealershipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    car: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Car",
        required: true
    },
    name: {
        type: String, 
        required: true
    },
})

module.exports =mongoose.model("Dealership", dealershipSchema);