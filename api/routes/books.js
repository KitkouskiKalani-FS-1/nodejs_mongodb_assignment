const express= require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../models/book");


router.get("/",(req,res,next)=>{
    Book.find({})
    .then(result=>{
        res.status(200).json({
            message: "All Books Found",
            books: result,
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

router.get("/:bookId",(req,res,next)=>{
    const bookId = req.params.bookId;

    Book.find({_id:bookId})
    .then(result=>{
        res.status(200).json({
            message: "One Book Found",
            book: result[0],
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
    const newBook = new Book({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author
    });

    newBook.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Book Saved",
            book: result,
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



router.patch("/:bookId",(req,res,next)=>{
    const bookId = req.params.bookId;
    
    const updatedBook = {
        title: req.body.title,
        author: req.body.author
    };

    Book.updateOne({
        _id:bookId
    }, {
        $set: updatedBook
    }).then(result=>{
        res.status(200).json({
            message: "Updated Book",
            book: result,
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

router.delete("/:bookId",(req,res,next)=>{
    const bookId = req.params.bookId;
    Book.findOneAndDelete({_id:bookId})
    .then(result=>{
        res.status(200).json({
            message: "Deleted Book",
            book: result,
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