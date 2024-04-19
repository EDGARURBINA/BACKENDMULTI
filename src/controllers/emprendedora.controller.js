import { clouddebugger } from "googleapis/build/src/apis/clouddebugger";
import Emprendedora from "../models/Emprendedora"
import Meta from "../models/Meta";
import Tip from "../models/Tip";
import { deleteImageEntrepreneur, uploadImageEntrepreneur } from "./uploadImg";


export const createEmprendedora = async (req, res) => {
    const { nombres, numeroCliente, apellidos, tip, semana1, semana2, semana3, totalVenta } = req.body;
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
            let url = req.file ? await uploadImageEntrepreneur(req.file, numeroCliente, numeroCliente) : req.body.img;
            const newEmprendedora = new Emprendedora({
                nombres: nombres,
                apellidos: apellidos,
                numeroCliente: numeroCliente,
                totalVenta: parseInt(totalVenta),
                tips: parseTips,
                img: url
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
        const verEmprendedoras = await Emprendedora.find().sort({ totalVenta: 1 });
        res.status(200).json(verEmprendedoras);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las emprendedoras' });
    }
};

export const getEmprendedoraById = async (req, res) => {
    const emprendedoras = await Emprendedora.findById(req.params.emprendedorasId)
    res.status(200).json(emprendedoras)
}

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
    const { nombres, numeroCliente, apellidos, tip, tips, semana1, semana2, semana3, totalVenta } = req.body;
    try {
        console.log(NumeroCliente);
        const parseTips = {
            tip: parseInt(tip),
            semana1: parseInt(semana1),
            semana2: parseInt(semana2),
            semana3: parseInt(semana3)
        }
        const newTips = JSON.parse(tips);
        newTips.push(parseTips);
        let url = req.file ? await uploadImageEntrepreneur(req.file, NumeroCliente, numeroCliente) : req.body.img;
        if (req.file) {
            url = `https://drive.google.com/uc?export=view&id=${url.id}`
        }
        const updatedEmprendedora = await Emprendedora.findOneAndUpdate(
            { numeroCliente: NumeroCliente },
            {
                nombres: nombres,
                apellidos: apellidos,
                numeroCliente: numeroCliente,
                totalVenta: parseInt(totalVenta),
                tips: newTips,
                img: url
            },
            { new: true }
        );
        res.status(200).json({ message: "Emprendedora actualizada correctamente", updatedEmprendedora: updatedEmprendedora });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la emprendedora" });
    }
};


export const deleteEmprendedoraByNumeroCliente = async (req, res) => {
    const { numeroCliente } = req.params;
    try {
        await Emprendedora.findOneAndDelete({ numeroCliente: numeroCliente });
        await deleteImageEntrepreneur(numeroCliente);
        res.status(200).json({ error: false, message: `Emprendedora eliminada exitosamente.` });
    } catch (error) {
        res.status(500).json({ error: true, message: `Error al eliminar la emprendedora ${error}` });
    }
}
