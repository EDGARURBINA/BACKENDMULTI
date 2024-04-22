import mongoose from "mongoose";

mongoose.connect("mongodb://3.135.157.51:52.15.237.151/TopperwareDB" ,{
   
})
.then (db => console.log ("Db esta conectado"))
.catch(error => console.log(error))


