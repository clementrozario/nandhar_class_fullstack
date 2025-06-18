import express from 'express'
import { Circle,Rectangle } from '../models/Area.js';

const router = express.Router();
// circle:
router.post('/circle',(req,res)=>{
    const { radius } = req.body;
    if(!radius) return 'please enter the radius to calculate';
    try{
        const circle = new Circle(radius);
        const calculate = circle.area();
        res.status(200).json({message:`the area of the circle is: ${calculate}`});
    }catch(error){
        res.status(400).json({message:'something went wrong',error:error.message})
    }
})

// rectangle:
router.post('/rectangle',(req,res)=>{
    const { width , height } = req.body;
    if(!(width) || !(height)) return 'width/height is missing'
    try{
        const rectangle = new Rectangle(width,height);
        const calculate = rectangle.area();
        res.status(200).json({message:`the area of the rectangle is : ${calculate}`});
    }catch(error){
        res.status(400).json({message:'something went wrong',error:error.message})
    }
})

export default router