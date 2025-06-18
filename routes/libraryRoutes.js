import express from 'express';
import { Book,library } from "../models/Library.js";
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// all
router.get('/books',authenticate,(req,res)=>{
    const allBooks = library.getAllBooks();
    res.status(200).json(allBooks);
})
// add:
router.post('/books',authenticate,(req,res)=>{
    const {title,author} = req.body;
    if(!title || !author) {
        return res.status(400).json({message:'Title and author is required'});
    }
    const newBook = new Book(title,author);
    library.addBook(newBook);
    res.status(201).json(newBook);
})

// Borrow:
router.post('/borrow',authenticate,(req,res)=>{
    const { title } = req.body;
    if(!title){
       return res.status(400).json({message:'Title is required'}); 
    }
    const borrowedBook = library.borrowBook(title);
    if(borrowedBook){
        return res.status(200).json({message:"book borrowed"})
    }
    else{
        return res.status(400).json({message:"book not available"});
    }
})

// return book:
router.post('/return',authenticate,(req,res)=>{
    const { title } = req.body;
    if(!title){
       return res.status(400).json({message:'Title is required'}); 
    }
    const returnedBook = library.returnBook(title);
    if(returnedBook){
        return res.status(200).json({message:"book returned"})
    }
    else{
        return res.status(400).json({message:"book not returned"});
    }
});

export default router;