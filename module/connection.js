import mongoose from "mongoose";
import express from "express";

const connection =async ()=>{

try{

    await mongoose.connect("mongodb://127.0.0.1:27017/filedbms")
}

catch(e)
{
    console.log("error");
}
}