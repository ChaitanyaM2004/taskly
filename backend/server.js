const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes.js");
const { PORT, mongoDBURL } = require("./config.js");
const AuthRoutes = require("./routes/AuthRoutes.js");
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.set('Cache-Control', 'no-store');
    res.status(200).send('Hello World');
   });

app.use('/tasks',taskRoutes);
app.use('/auth',AuthRoutes);


mongoose
 .connect(mongoDBURL)
 .then(()=>{
    console.log("connected to the db");
    app.listen(PORT,'0.0.0.0',()=>{
        console.log(`Server is running at PORT ${PORT}`);
    })

 }).catch((error)=>{
    console.log("error connecting to the db",error);
 });
