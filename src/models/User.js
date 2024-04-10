import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true 
    },
    password:{
        type:String,
        required: true
    },
    roles:[{
        ref: "Role",
        type:Schema.Types.ObjectId
    }]
})

userSchema.statics.encryptPassword = async (password) => { 
const salt = await bcrypt.genSalt(10)
 return await bcrypt.hash(password, salt)

}

userSchema.statics.comparePassword = async (password , receivedPassword) =>{
   return await bcrypt.compare(password , receivedPassword)

}

export default model ('User', userSchema);
