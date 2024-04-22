import mongoose from "mongoose";

mongoose.connect("mongodb://52.15.237.151:27017/TopperwareDB" ,{
   
})
.then (db => console.log ("Db esta conectado"))
.catch(error => console.log(error))


