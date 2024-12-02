import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import borrowRoutes from './routes/borrow.js';



dotenv.config();
//middlewares

const app = express();
app.use(express.json());



app.use("*", (req, res) => {
    res
      .status(404)
      .send({ message: "Resource URL not found", success: false, data: null });
  });
  
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

const port = process.env.PORT
 app.listen(port, ()=>{
    console.log("Server on fire")
 });

