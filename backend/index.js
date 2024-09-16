const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  
const port = 5000;  
const app = express();
const mongoose = require("mongoose");

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://vmkmano13:13-Aug-2000@student-data.sirqh.mongodb.net/?retryWrites=true&w=majority&appName=Student-data', {
}).then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Student Schema and Model
const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true }, 
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true }
});

const Student = mongoose.model('student', studentSchema);  

// Routes
app.post("/create", async (req, res) => {
    const { studentId, name, age, grade } = req.body;
    try {
        const newStudent = new Student({ studentId, name, age, grade }); 
        await newStudent.save();
        res.status(201).json(newStudent);  
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

//get id

app.get('/read/:id', async (req, res) => {
    try {
      // Use await to ensure the database operation completes before moving forward
      const student = await Student.findOne({ studentId: req.params.id });
  
      if (student) {
      
        res.json(student);
      } else {
      
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
    
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.delete('/delete/:id', async (req, res) => {
    try {
      // Find and delete the student by studentId
      const student = await Student.findOneAndDelete({ studentId: req.params.id });
  
      if (student) {
        // Send a success response with a 200 status code or a 204 status code
        res.status(200).json({ message: "Student data deleted successfully" });
        // Alternatively, you can use res.sendStatus(204) for no content
      } else {
        res.status(404).json({ message: "Student not found" });
      }
    } catch (error) {
      // Catch any server errors and return a 500 status
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  app.put('/update/:id',async (req, res) =>{

    try{
    const student = await Student.findOneAndUpdate({studentId : req.params.id},req.body,{new:true});

    // const {studentId , name, age, grade } = req.body;
    if(!student){
      res.status(404).json({message : "id is not working"})
    }
  }catch(error){

    res.status(400).json({message : error.message})

  }

  });
  
  
  


app.get('/', (req, res) => {
    res.send("Hello World");
});

// Server listening
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
