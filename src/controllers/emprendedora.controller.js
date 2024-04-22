
import Emprendedora from "../models/Emprendedora"
import  jwt  from "jsonwebtoken";
import Role from "../models/Role";
import Meta from "../models/Meta";
import { deleteImage, uploadImage } from "../middlewares/uploadImg";
import User from "../models/User";
const folder = "imgsEntrepreneurs";

export const createEmprendedora = async (req, res) => {
    const { nombres, numeroCliente, apellidos, phone, tip, semana1, semana2, semana3, totalVenta } = req.body;
    try {
        const parseTips = [{
            tip: parseInt(tip),
            semana1: parseInt(semana1),
            semana2: parseInt(semana2),
            semana3: parseInt(semana3)
        }]

        if (await Emprendedora.findOne({ numeroCliente: numeroCliente })) {
            res.status(200).json({ existe: true, error: false, message: `Emprendedora con numero de cliente: ${numeroCliente} ya esta agregada.` });
        } else {
            let url = req.file ? await uploadImage(req.file, numeroCliente, numeroCliente, folder) : req.body.img;
            const newEmprendedora = new Emprendedora({
                nombres: nombres,
                apellidos: apellidos,
                phone: phone,
                numeroCliente: numeroCliente,
                totalVenta: parseInt(totalVenta),
                tips: parseTips,
                img: url,
                role: 'emprendedora'
            });
            const emprendedoraSaved = await newEmprendedora.save();
            console.log('Emprendedora guardada correctamente:', emprendedoraSaved);
            res.status(201).json({ existe: false, error: false, message: "Emprendedora creada correctamente.", emprendedora: emprendedoraSaved });
        }
    } catch (error) {

        console.error('Error al guardar la Emprendedora:', error);
        res.status(500).json({ message: 'Error al crear la emprendedora', error, error: true, });
    }
};



export const getEmprendedoras = async (req, res) => {
    try {
        const emprendedoras = await Emprendedora.find().sort({ totalVenta: -1 });
        console.log(1);
        if (!emprendedoras || emprendedoras.length === 0) {
            console.log("No se encontraron Emprendedoras.");
            res.status(404).json({message: "No se encontraron Emprendedoras." });
        }
        console.log(1);
        let topValue = 1;
        for (let i = 0; i < emprendedoras.length; i++) {
            const emprendedora = emprendedoras[i];
            emprendedora.top = topValue;
            await emprendedora.save();
            console.log(await emprendedora.save());
            topValue++;
        }
        console.log(emprendedoras);
        res.status(200).json(emprendedoras);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las emprendedoras' });
    }
};

export const getEmprendedoraByNumeroCliente = async (req, res) => {
    const { NumeroCliente } = req.params;
    try {
        const verEmprendedora = await Emprendedora.findOne({numeroCliente: NumeroCliente});
        res.status(200).json(verEmprendedora);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las emprendedoras' });
    }
};

async function verificarMetasAlcanzadas(emprendedora) {
    try {
        const metas = await Meta.find();

        const nuevasMetasObtenidas = metas.filter(meta => {
            return !emprendedora.metasObtenidas.find(m => m.clave === meta.clave) && emprendedora.ventaTotal >= meta.ventaNecesaria;
        });

        emprendedora.metasObtenidas.push(...nuevasMetasObtenidas);

        await emprendedora.save();
    } catch (error) {
        console.error("Error al verificar metas alcanzadas:", error);
        throw error;
    }
}

export const updateEmprendedoraByNumeroCliente = async (req, res) => {
    const { NumeroCliente } = req.params;
    const { nombres, numeroCliente, apellidos, email, phone, tip, tips, semana1, semana2, semana3, totalVenta } = req.body;
    try {
        const parseTips = {
            tip: parseInt(tip),
            semana1: parseInt(semana1),
            semana2: parseInt(semana2),
            semana3: parseInt(semana3)
        }
        const newTips = JSON.parse(tips);
        newTips.push(parseTips);
        if (NumeroCliente === numeroCliente) {
            let url = req.file ? await uploadImage(req.file, NumeroCliente, NumeroCliente, folder) : req.body.img;
            const updatedEmprendedora = await Emprendedora.findOneAndUpdate(
                { numeroCliente: NumeroCliente },
                {
                    nombres: nombres,
                    apellidos: apellidos,
                    email: email,
                    phone: phone,
                    numeroCliente: NumeroCliente,
                    totalVenta: parseInt(totalVenta),
                    tips: newTips,
                    img: url
                },
                { new: true }
            );
            res.status(200).json({ message: "Emprendedora actualizada correctamente", updatedEmprendedora: updatedEmprendedora });
        } else if (await Emprendedora.findOne({ numeroCliente: numeroCliente })) {
            res.status(200).json({ existe: true, error: false, message: `Emprendedora con numero de cliente: ${numeroCliente} ya esta agregada.` });
        } else {
            let url = req.file ? await uploadImage(req.file, NumeroCliente, numeroCliente, folder) : req.body.img;
            const updatedEmprendedora = await Emprendedora.findOneAndUpdate(
                { numeroCliente: NumeroCliente },
                {
                    nombres: nombres,
                    apellidos: apellidos,
                    email: email,
                    phone: phone,
                    numeroCliente: numeroCliente,
                    totalVenta: parseInt(totalVenta),
                    tips: newTips,
                    img: url
                },
                { new: true }
            );
            res.status(200).json({ message: "Emprendedora actualizada correctamente", updatedEmprendedora: updatedEmprendedora });

        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la emprendedora", error });
    }
};


export const deleteEmprendedoraByNumeroCliente = async (req, res) => {
    const { numeroCliente } = req.params;
    try {
        await Emprendedora.findOneAndDelete({ numeroCliente: numeroCliente });
        await deleteImage(folder, numeroCliente);
        res.status(200).json({ error: false, message: `Emprendedora eliminada exitosamente.` });
    } catch (error) {
        res.status(500).json({ error: true, message: `Error al eliminar la emprendedora ${error}` });
    }
}
