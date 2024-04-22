import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";
import Emprendedora from "../models/Emprendedora";

export const validatePassword = async (req, res) => {
    const { password } = req.body;

    try {
        if (await User.findOne({ password: await User.comparePassword(password) })) {
            res.status(200).json({ message: "Contraseña correcta." });
        } else {
            res.status(401).json({ message: "Contraseña incorrecta." });
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error.", error: error });
    }
};

export const updateAdmin = async (req, res) => {
    const { oldUsername, newUsername, newPassword } = req.body;

    try {
        await User.findOneAndUpdate(
            { username: oldUsername },
            {
                $set: {
                    username: newUsername,
                    password: await User.encryptPassword(newPassword)
                }
            }
        )
        res.status(200).json({ message: "Datos actualizados con exito." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error.", error: error });
    }
};

export const singin = async (req, res) => {
    const adminFound = await User.findOne({ email: req.body.email }).populate("roles");
    let token = '';
    if (adminFound) {
        const matchPassword = await User.comparePassword(req.body.password, adminFound.password)
        if (!matchPassword) res.status(403).json({ error: true, message: "Contraseña incorrecta."})
        token = jwt.sign({ id: adminFound._id }, config.SECRET, {
            expiresIn: 86400
        });
        res.status(200).json({ error: false, token: token, path:'/AdminEntrepreneurs' })
    } else {
        res.json({ error: true, message: "Usuario no encontrado." })
    }
};
