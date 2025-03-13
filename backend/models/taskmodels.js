const mongoose = require('mongoose');
const taskschema = new mongoose.Schema({
    title:{
      type:String,
        required:true
    },
    Description:{
        type:String,
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:['pending','in progress','completed','on hold'],
        default:'pending'
    },

    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'medium',
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{timestamps:true});

const Task = mongoose.model('Task',taskschema);
module.exports = Task;