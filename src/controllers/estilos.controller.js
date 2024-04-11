import Estilo from "../models/Estilo";

export const createEstilo = async (req, res) =>{
    try {
        const {clave, nombre, cantidad, precio, categoria, descripcion,img} = req.body;
const newEstilo =  new  Estilo ({clave, nombre, cantidad, precio, categoria, descripcion, img});

const estiloSaved = await newEstilo.save();
res.status(201).json({ message: "Estilo creado exitosamente", estilo: estiloSaved });

    } catch (error) {
        res.status(500).json({ message: "Error al crear el Estilo" });
    }


}

export const getEstilos = async (req, res) =>{
    try {
        const verEstilos = await Estilo.find()
        res.json(verEstilos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estilos' });
    }
    
}

export const getEstilosById = async (req, res) =>{
    const estilo = await Estilo.findById(req.params.estiloId)
        res.status(200).json(estilo)
}

export const updateEstiloById = async (req, res) =>{
    const updatedEstilo = await Estilo.findByIdAndUpdate(req.params.estiloId, req.body, {
        new: true
    });
    res.status(200).json({ message: "Estilo actualizado correctamente",updatedEstilo});
}

export const deleteEstiloById = async (req, res) =>{
        const { estiloId } = req.params;
        try {
            await Estilo.findByIdAndDelete(estiloId);
            res.status(204).end();
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Error al eliminar el producto" });
        }
    }