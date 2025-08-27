import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModel } from './db.js';



const app = express();

app.post('/api/v1/signup', async (req:any,res:any)=>{
    const username=req.body.username;
    const password =req.body.password;

    await UserModel.create({
        username,
        password
    })

    res.json({
        message:"User created successfully"
    })
})

app.post("/api/v1/signin", async (req,res)=>{


})
 
app.post("/api/v1/content",(req,res)=>{

})

app.get("/api/v1/content",(req,res)=>{
    
})

app.delete("/api/v1/content/:id",(req,res)=>{
    
})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:sharelink",(req,res)=>{

})


