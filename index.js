import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import borrowRoutes from './routes/borrow.js';



dotenv.config();
//middlewares

const app = express();
const port = process.env.PORT|| 3000;

app.use(express.json());
app.use(cors());


// // Log requests for debugging
// app.use((req, res, next) => {
//   console.log("Request Headers:", req.headers);
//   console.log("Request Body:", req.body);
//   next();
// });


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use("*", (req, res) => {
    res
      .status(404)
      .send({
        message: "Resource URL not found",
        success: false,
        data: null,
        requestedUrl: req.originalUrl, // Logs the requested URL
        method: req.method            // Logs the HTTP method (GET, POST, etc.)
      });
});


 app.listen(port, ()=>{
    console.log("Server on fire")
 });

  
