const mongoose = require("mongoose")


async function connectToDb(){
   await mongoose.connect("mongodb+srv://apeksha:helloworld@cluster0.wqvkqxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
   console.log("Database connected")
}

module.exports = connectToDb