//Where all the logics are
// const express = require('express');
// const env = require('dotenv');
// const mongoose = require('mongoose');
import express from 'express'
import env from 'dotenv'
import mongoose from 'mongoose'
import Cors from 'cors';
// Models
// Routes
import {router as userRoutes} from './routes/user.js'

// App Config
const app = express();
const connection_url = 'mongodb+srv://admin:emYP7tapmH-g-76@cluster0.6pcea.mongodb.net/mern-elearn?retryWrites=true&w=majority'

// Environment constants
env.config();

// Middlewares
app.use(express.json());
app.use(Cors());
app.use('/api', userRoutes);

// DB Config
mongoose.connect(
  // `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@mern-elearn.6pcea.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
  connection_url,
  {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Database connected');
});

// API Endpoints
app.get('/', (req, res, next) =>{
  res.status(200).json({
    message: 'Hello from server'
  });
});

app.post('/data', (req, res, next) =>{
  res.status(200).json({
    message: req.body
  });
});

// Listener
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});