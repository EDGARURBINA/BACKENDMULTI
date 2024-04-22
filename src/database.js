import mongoose from "mongoose";

mongoose.connect("mongodb://52.15.237.151:3.135.157.51/TopperwareDB" ,{
   
})
.then (db => console.log ("Db esta conectado"))
.catch(error => console.log(error))


