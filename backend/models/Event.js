// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    uid:{type:String,required:true},
    title: { type: String, required: true },
    date: { type: Date, required: true },
    reminder: { type: Boolean, default: false },
    location:{type:String,required:false},
    session_start:{type:String,required:true},
    session_expire:{type:String,required:false},
    description:{type:String,required:true},
    weather:{type:String,required:false}
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
