import express from 'express'
import { BankAccount,account } from '../models/BankAccount.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

//initial balance:
router.get('/balance',authenticate,(req,res)=>{
    try{
        const balance = account.getBalance();
        res.status(200).json({message:`Your available balance is:${balance}`});
    }catch{
        res.status(400).json({message:'server error',error:error.message})
    }
})

//history
router.get('/history',authenticate,(req,res)=>{
    try{
        const history = account.getHistory();
        res.status(200).json(history);
    }catch{
        res.status(400).json({message:'server error',error:error.message})
    }
})

//deposit:
router.post('/deposit',authenticate,(req,res)=>{
    const { amount } = req.body;
    if(!amount) return 'please enter a valid amount'
    try{
        account.deposit(amount);
        res.status(200).json({message:`amount successfully deposited,now balance is:${account.getBalance()}`});  
    }catch{
       res.status(400).json({message:'server error',error:error.message}) 
    }
})

//withDraw:
router.post('/withdraw',authenticate,(req,res)=>{
    const {amount} = req.body;
    if(!amount) return 'please enter a valid amount'
    try{
        account.withdraw(amount);
        res.status(200).json({message:`amount successfully withdrawn,now balance is:${account.getBalance()}`});  
    }catch{
       res.status(400).json({message:'not sufficient funds',error:error.message}) 
    }
})

export default router;