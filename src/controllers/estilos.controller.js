import Estilo from "../models/Estilo";
import { postImageProduct } from "./uploadImg";

export const createEstilo = async (req, res) => {
    const { clave, nombre, cantidad, precio, categoria, descripcion } = req.body;
    try {
        let url = req.file ? await postImageProduct(req.file, clave, clave) : req.body.img;
        if (req.file) {
            url = `https://drive.google.com/uc?export=view&id=${url.id}`
        }
        const newEstilo = new Estilo({
            clave,
            nombre,
            cantidad: parseInt(cantidad),
            precio: parseInt(precio),
            categoria,
            descripcion,
            img: url
        });

        if (await Estilo.findOne({ clave: clave })) {
            res.status(200).json({ existe: true, error: false, message: `Estilo con clave: ${clave} ya esta agregado.` });
        } else {
            await newEstilo.save();
            res.status(201).json({ existe: false, error: false, message: "Estilo creado correctamente." });
        }
    } catch (error) {
        res.status(500).json({error: true, message: `Error al crear el Estilo: ${error}` });
    }


}

export const getEstilos = async (req, res) => {
    try {
        const verEstilos = await Estilo.find()
        res.status(200).json(verEstilos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estilos' });
    }

}

export const updateEstiloByClave = async (req, res) => {
    const { Clave } = req.params;
    const { clave, nombre, cantidad, precio, categoria, descripcion, img } = req.body;
    try {
        let url = req.file ? await postImageProduct(req.file, clave, clave) : req.body.img;
        if (req.file) {
            url = `https://drive.google.com/uc?export=view&id=${url.id}`
        }
        const newEstilo = {
            clave: clave,
            nombre: nombre,
            cantidad: parseInt(cantidad),
            precio: parseInt(precio),
            categoria: categoria,
            descripcion: descripcion,
            img: url
        };
        if (Clave === clave) {
            await Estilo.findOneAndUpdate(
                { clave: clave },
                newEstilo,
                { new: true }
            );
            res.status(200).json({ existe: false, error: false, message: "Estilo actualizado correctamente." });
        } else if (await Estilo.findOne({ clave: clave })) {
            res.status(200).json({ existe: true, error: false, message: `Estilo con clave: ${clave} ya esta agregado.` });
        } else {
            await Estilo.findOneAndUpdate(
                { clave: Clave },
                newEstilo,
                { new: true }
            );
            res.status(200).json({ existe: false, error: false, message: "Estilo actualizado correctamente." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: `Error al modificar el  producto: ${error}` });
    }
}

export const deleteEstiloByClave = async (req, res) => {
    const { Clave } = req.params;
    try {
        await Estilo.findOneAndDelete({ clave: Clave });
        res.status(200).json({ error: false, message: "Estilo eliminado correctamente." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: true, message: `Error al eliminar el estilo: ${error}` });
    }
} 