import mongoose from "mongoose";

mongoose.connect("mongodb://adminusername:adminpassword@54.92.194.229:27017/TopperwareDB" ,{
   
})
.then (db => console.log ("Db esta conectado"))
.catch(error => console.log(error))


