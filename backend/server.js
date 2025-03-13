const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes.js");
const userRoutes = require("./routes/userRoutes.js"); // Import user routes
const { PORT, mongoDBURL } = require("./config.js");

const app = express();


app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.set('Cache-Control', 'no-store');
    res.status(200).send('Hello World');
   });

app.use('/tasks',taskRoutes);
app.use('/users',userRoutes);

mongoose
 .connect(mongoDBURL)
 .then(()=>{
    console.log("connected to the db");
    app.listen(PORT,()=>{
        console.log(`Server is running at PORT ${PORT}`);
    })

 }).catch((error)=>{
    console.log("error connecting to the db",error);
 });
