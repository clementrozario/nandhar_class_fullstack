import express from 'express'
const app = express();
const PORT = 5001;

import libraryRoutes from './routes/libraryRoutes.js'
import accountRoutes from './routes/accountRoutes.js';
import areaRoutes from './routes/areaRoutes.js'
import authRoutes from './routes/authRoutes.js'

app.use(express.json());

app.use('/library', libraryRoutes);
app.use('/account', accountRoutes);
app.use('/area', areaRoutes);
app.use('/auth',authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port:${PORT}`)
})