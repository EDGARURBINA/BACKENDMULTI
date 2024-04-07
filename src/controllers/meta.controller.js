import Meta from "../models/Meta";

export const createMeta = async (req, res) => {
    const { clave, nombre, descripcion, ventaNecesaria, img } = req.body;
    try {
        const newMeta = new Meta({ clave, nombre, descripcion, ventaNecesaria, img });
        const metaSaved = await newMeta.save();
        res.status(201).json({ message: "Meta creada exitosamente", meta: metaSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la meta " });
    }
}


export const getMetas = async (req, res) => {
    try {
        const verMetas = await Meta.find()
        res.json(verMetas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las metas' });
    }
}


export const getMetaById = async (req, res) => {
    try {
        const metas = await Meta.findById(req.params.metasId)
        res.status(200).json(metas)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'No se encontro la meta' });

    }
}


export const updateMetaById = async (req, res) => {
    const updatedMeta = await Meta.findByIdAndUpdate(req.params.metasId, req.body, {
        new: true
    });
    res.status(200).json({ message: "Meta actualizada correctamente",updatedMeta});
};


export const deleteMetaById = async (req, res) => {
    const {metasId} = req.params;
    try {
        const metaEliminada = await Meta.findByIdAndDelete(metasId);
        if (!metaEliminada) {
            return res.status(404).json({ message: "Meta no encontrada" });
        }
        res.status(204).json({ message: "Meta eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la meta" });
        
    }
}





