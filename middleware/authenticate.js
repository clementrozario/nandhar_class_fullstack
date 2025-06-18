
import jwt from 'jsonwebtoken';

const SECRET = 'super-secret';

export default function authenticate(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({ message: 'Token required' });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,SECRET);
        req.user=decoded;
        next();
    }catch(error){
        res.status(403).json({message:'Invalid or expired token'});
    }
}