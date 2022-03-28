const express= require("express");
const mongoose = require("mongoose");
const { response } = require("../../app/app");
const Dealership = require("../models/dealership");
const router = express.Router();


router.get("/",(req,res,next)=>{
    Dealership.find({})
    .then(result=>{
        res.status(200).json({
            message: "All Dealerships Found",
            dealerships: result,
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

router.post("/",(req,res,next)=>{
    Dealership.find({
        car: req.body.car, 
        name: req.body.name
    })
    .exec()
    .then(result=>{
        console.log(result);
        if(result.length>0){
            return res.status(406).json({
                message: "Dealership is already in database"
            })
        }
        const newDealership = new Dealership({
            _id: mongoose.Types.ObjectId(),
            car: req.body.car,
            name: req.body.name
        });
    
        newDealership.save()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message:"Dealership Saved",
                dealership: result,
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
    .catch(err=> {
        console.error(err);
        res.status(500).json({
            error:{
                message:"Unable to save dealership with name: " + req.body.name
            }
        })
    })
})

router.get("/:dealershipId",(req,res,next)=>{
    const dealershipId = req.params.dealershipId;
    Dealership.findById(dealershipId)
    .select("name _id")
    .populate("car", "make model")
    .exec()
    .then(dealership =>{
        if(!dealership){
            console.log(dealership);
            return res.status(404).json({
                message: "Dealership Not Found"
            })
        }
        res.status(201).json({
            dealership: dealership
        })
    })
    .catch(err => {
        res.status(500).json({
            error:{
                message: err.message
            }
        })
    })

})

router.patch("/:dealershipId",(req,res,next)=>{
    const dealershipId = req.params.dealershipId;
   
    const updatedDealership = {
        car: req.body.car,
        name: req.body.name
    };

    Dealership.updateOne({
        _id: dealershipId
    }, {
        $set: updatedDealership
    }).then(result=>{
        res.status(200).json({
            message: "Updated Dealership",
            dealership: result,
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

router.delete("/:dealershipsId",(req,res,next)=>{
    const dealershipsId = req.params.dealershipsId;
    
    Dealership.deleteOne({_id: dealershipsId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"Dealership Deleted",
            request:{
                method: "GET",
                url: "http://localhost:3000/dealerships/"+ dealershipsId

            }
        })
    })
    .catch(err =>{
        res.status(500).json({
            message: err.message
        })
    })
})
module.exports = router;