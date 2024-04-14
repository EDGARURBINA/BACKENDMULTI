import User from "../models/User";
import  jwt  from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";


export const singUp = async (req, res) => {
    const { username, email, password, roles } = req.body;

    try {
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password)
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role._id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();
        res.status(200).json({ user: savedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el usuario" });
    }
};


    
export const singin = async (req, res) => {
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if(!userFound) return res.json({error: true, message:"user not found"})

    const matchPassword = await  User.comparePassword(req.body.password, userFound.password)

    if(!matchPassword) return res.json({error: true, message: "contraseña incorrecta"})
     
   const token =  jwt.sign({id: userFound._id}, config.SECRET,{
    expiresIn : 86400
   }) 
 
    console.log(userFound)
    res.json({error: false, token:token})
};
