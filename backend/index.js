const express = require("express")
const body_parser = require("body-parser")
const cros = require("cors")
const prot = 5000;
const app = express();
const mongoose = require("mongoose");
const { type } = require("os");


app.use(cros());
app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

mongoose.connect('mongodb+srv://vmkmano13:13-Aug-2000@student-data.sirqh.mongodb.net/?retryWrites=true&w=majority&appName=Student-data',{
}).then(()=>{
    console.log("mango db connected")
}).catch(()=>{
    console.log("mongo db error");
})

const studentschema = new mongoose.Schema({
    StudentId : {type : String,required : true},
    name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true }
})

const student = mongoose.model('student' , studentschema);

module.exports = student;



app.get('/',(req,res)=>[
    res.send("hello world")
])

app.listen(prot,()=>{
    console.log(`server is running on ${prot}`)
})