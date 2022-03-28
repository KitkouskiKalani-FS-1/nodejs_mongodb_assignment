const express= require("express");
const { response } = require("../../app/app");
const Author = require("../models/author");
const router = express.Router();


router.get("/",(req,res,next)=>{
    res.json({message:"Authors - GET"})
})

router.post("/",(req,res,next)=>{
    res.json({message:"Authors - POST"})
})

router.get("/:authorId",(req,res,next)=>{
    const authorId = req.params.authorId;
    Author.findById(authorId)
    .select("name _id")
    .populate("book", "title author")
    .exec()
    .then(author =>{
        if(!author){
            console.log(author);
            return res.status(404).json({
                message: "Author Not Found"
            })
        }
        response.status(201).json({
            author: author
        })
    })
    .catch(err => {
        response.status(500).json({
            error:{
                message: err.message
            }
        })
    })

})

router.patch("/:authorId",(req,res,next)=>{
    const authorId = req.params.authorId;
    res.json({
        message:"Authors - PATCH BY ID",
        id: authorId
    })
})

router.delete("/:authorId",(req,res,next)=>{
    const authorId = req.params.authorId;
    
    Author.deleteOne({_id: authorId})
    .exec()
    .then(result =>{
        res.status(200).json({
            message:"Author Deleted",
            request:{
                method: "GET",
                url: "http://localhost:3000/authors/"+ authorId

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