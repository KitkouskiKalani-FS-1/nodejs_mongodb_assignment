const express= require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Car = require("../models/car");


router.get("/",(req,res,next)=>{
    Car.find({})
    .then(result=>{
        res.status(200).json({
            message: "All Cars Found",
            cars: result,
            metadata:{
                host:req.hostname,
                method: req.method
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
})

router.get("/:carId",(req,res,next)=>{
    const carId = req.params.carId;

    Car.find({_id:carId})
    .then(result=>{
        res.status(200).json({
            message: "One Car Found",
            car: result[0],
            metadata:{
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
})

router.post("/",(req,res,next)=>{
    const newCar = new Car({
        _id: mongoose.Types.ObjectId(),
        make: req.body.make,
        model: req.body.model
    });

    newCar.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Car Saved",
            car: result,
            metadata: {
                method: req.method,
                host: req.hostname
            }
        })
    })
    .catch(err=>{
        console.log(err.message);
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
    
})



router.patch("/:carId",(req,res,next)=>{
    const carId = req.params.carId;
    
    const updatedCar = {
        make: req.body.make,
        model: req.body.model
    };

    Car.updateOne({
        _id:carId
    }, {
        $set: updatedCar
    }).then(result=>{
        res.status(200).json({
            message: "Updated Car",
            car: result,
            metadata:{
                host:req.hostname,
                method: req.method
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
})

router.delete("/:carId",(req,res,next)=>{
    const carId = req.params.carId;
    Car.findOneAndDelete({_id:carId})
    .then(result=>{
        res.status(200).json({
            message: "Deleted Car",
            car: result,
            metadata:{
                host:req.hostname,
                method: req.method
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })
})
module.exports = router;