import express from"express";
import dotenv from"dotenv";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
dotenv.config();
const app=express();

const DB_URL = process.env.DB_URL; // MongoDB connection string

mongoose.connect(DB_URL)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => console.log("MongoDB Connection Error:", err));
// middleware;
app.use(express.urlencoded({extended:false}));

const storage=multer.diskStorage({
    destination:function(req,file,cb){

        return cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    },
    });

    const upload =multer({storage});
app.set("view engine", "ejs"); 
app.set("views",path.resolve("view"));
const port=process.env.PORT;


app.get("/",(req,res)=>{

res.render("home");

});

app.post("/upload",upload.single("profileimage"),(req,res)=>{
console.log(req.body);
console.log(req.file.path);
return res.redirect("/");

});

app.listen(port,()=>{console.log("server is running..")});