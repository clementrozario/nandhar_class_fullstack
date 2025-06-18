
import express from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

const router = express.Router();
const SECRET = 'super-secret';

const users = [];

router.post('/register',(req,res,)=>{
    const { name,email,password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({ message: 'All fields require' });
    }
    if(users.find(u=>u.email===email)){
        return res.status(409).json({ message: 'Email already registered' });
    }
    const user = new User(Date.now(),name,email,password);
    users.push(user);
    res.status(201).json({ message: 'User registered', userId: user.id });
 });

 router.post('/login', (req, res) =>{
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({userId:user.id,name:user.name,email:user.email},SECRET,{expiresIn:'1h'});
    res.status(200).json({token});
 })

 export { users };
 export default router;