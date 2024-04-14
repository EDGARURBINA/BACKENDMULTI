import Emprendedora from "../models/Emprendedora"
import Meta from "../models/Meta";
import Tip from "../models/Tip";


export const createEmprendedora = async (req, res) => {
    const { nombres, numeroCliente, apellidos, tips, totalVenta, img } = req.body;
    try {
        const currentDate = new Date();
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        const differenceMs = currentDate - firstDayOfYear;
        const daysElapsed = Math.floor(differenceMs / (1000 * 60 * 60 * 24)) + 1;
        let tipActual = 0;
        for (let numeroTip = 21; numeroTip < daysElapsed; numeroTip += 21) {
            tipActual += 1;
        }
        console.log(totalVenta);
        const newEmprendedora = new Emprendedora({
            nombres,
            numeroCliente,
            totalVenta,
            apellidos,
            img,
            tips: [new Tip(tips[0])]
        });
        const emprendedoraSaved = await newEmprendedora.save();
        console.log('Emprendedora guardada correctamente:', emprendedoraSaved);
        res.status(201).json({ message: "Emprendedora creada exitosamente", emprendedora: emprendedoraSaved });
    } catch (error) {
        console.error('Error al guardar la Emprendedora:', error);
        res.status(500).json({ message: "Error al crear la emprendedora", error });
    }
};



export const getEmprendedoras = async (req, res) => {
    try {
        const verEmprendedoras = await Emprendedora.find().sort({ _id: 1 });
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

export const updateEmprendedoraById = async (req, res) => {
    const { emprendedorasId } = req.params;
    try {
        const updatedEmprendedora = await Emprendedoras.findByIdAndUpdate(
            emprendedorasId,
            req.body,
            { new: true }
        );
        if (!updatedEmprendedora) {
            return res.status(404).json({ message: "Emprendedora no encontrada" });
        }

        // Verifica las metas alcanzadas para la emprendedora actualizada
        await verificarMetasAlcanzadas(updatedEmprendedora);

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
