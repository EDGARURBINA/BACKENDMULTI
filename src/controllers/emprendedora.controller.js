import Emprendedora from "../models/Emprendedora"
import Meta from "../models/Meta";
import Tip from "../models/Tip";
import { postImageEntrepreneur } from "./uploadImg";


export const createEmprendedora = async (req, res) => {
    const { nombres, numeroCliente, apellidos, tips, totalVenta, img } = req.body;
    try {
        const validatedTips = await Promise.all(
            tips.map(async tipData => {
                const { tip, semana1, semana2, semana3 } = tipData;
                const newTip = new Tip({ tip, semana1, semana2, semana3 });
                await newTip.validate(); 
                return newTip;
            })
        );
        const url = typeof img === "string" ? img : await postImageEntrepreneur(img);
        console.log(url);
        const newEmprendedora = new Emprendedora({
            nombres,
            apellidos,
            numeroCliente,
            totalVenta,
            img,
            tips: validatedTips 
        });
        const emprendedoraSaved = await newEmprendedora.save();
        console.log('Emprendedora guardada correctamente:', emprendedoraSaved);
        res.status(201).json({ message: 'Emprendedora guardada correctamente', emprendedora: emprendedoraSaved });
    } catch (error) {
        console.error('Error al guardar la Emprendedora:', error);
        res.status(500).json({ message: 'Error al crear la emprendedora', error });
    }
};



export const getEmprendedoras = async (req, res) => {
    try {
        const verEmprendedoras = await Emprendedora.find().sort({ totalVenta: 1 });
        res.json(verEmprendedoras);
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
    const { numeroCliente } = req.params;
    try {
        console.log(numeroCliente);
        const updatedEmprendedora = await Emprendedora.findOneAndUpdate(
            { numeroCliente: numeroCliente},
            req.body,
            { new: true }
        );
        if (!updatedEmprendedora) {
            return res.status(404).json({ message: "Emprendedora no encontrada" });
        }

        // await verificarMetasAlcanzadas(updatedEmprendedora);

        res.status(200).json({ message: "Emprendedora actualizada correctamente", updatedEmprendedora });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la emprendedora" });
    }
};


export const deleteEmprendedoraById = async (req, res) => {
    const { emprendedorasId } = req.params;
    try {
        const emprendedoraEliminada = await Emprendedoras.findByIdAndDelete(emprendedorasId);
        if (!emprendedoraEliminada) {
            return res.status(404).json({ message: "Emprendedora no encontrada" });
        }
        res.status(204).json({ message: "Emprendedora eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la emprendedora" });
    }
}
