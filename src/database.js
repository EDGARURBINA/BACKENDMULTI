import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/TopperwareDB" ,{
   
})
.then (db => console.log ("Db esta conectado"))
.catch(error => console.log(error))


