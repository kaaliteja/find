const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app =express();
app.use(cors());

app.get("/collegesList",async(req,res)=>{
   let  collegesList= await Student.find().distinct("college");
   return res.json(collegesList);
});

app.get("/backlogsList",async(req,res)=>{
   let backlogsList = await Student.find().distinct("backlogs");
   return res.json(backlogsList);
});

app.get("/gendersList",async(req,res)=>{
   let gendersList = await Student.find().distinct("gender");
   return res.json(gendersList);
});



app.get("/students"),async(req,res)=>{

    console.log(req.query);

    let studentsArr = await Student.find().and([
        {college:req.query.college},
        {backlogs:req.query.backlogs},
        {gender:req.query.gender},
    ])};


    app.get("/students/:college/:backlogs/:gender"),async(req,res)=>{

        console.log(req.query);
    
        let studentsArr = await Student.find().and([
            {college:req.params.college},
            {backlogs:req.params.backlogs},
            {gender:req.params.gender},
        ]);
   
   
    res.json(studentsArr);



};

app.listen(2024,()=>{
    console.log("Listening to port 2024");
});

let studentSchema = new mongoose.Schema({
    id:Number,
    profilePic:String,
    firstName:String,
    lastName:String,
    gender:String,
    age:Number,
    email:String,
    college:String,
    backlogs:Number,
    fee:Number,

})

let Student = new mongoose.model("student",studentSchema,"students");


let connectToMDB = async()=>{
try{
    mongoose.connect("mongodb+srv://kaaliteja:kaaliteja@teja1.njmq2.mongodb.net/btech?retryWrites=true&w=majority&appName=Teja1");

 console.log("Successfully  connect to MDB");
  
}catch(err){
 console.log("Unable to connect to MDB");
}

   

};

connectToMDB();