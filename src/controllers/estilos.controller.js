import { deleteImage, uploadImage } from "../middlewares/uploadImg";
import Estilo from "../models/Estilo";
import Product from "../models/Product";
const folder = 'imgsStyle';

export const createEstilo = async (req, res) => {
    const { clave, nombre, cantidad, precio, categoria, descripcion } = req.body;
    try {

        if (await Estilo.findOne({ clave: clave })) {
            res.status(200).json({ existe: true, error: false, message: `Estilo con clave: ${clave} ya esta agregado.` });
        } else {
            await Product.findOneAndUpdate(
                { clave: clave.split('-')[0] },
                { $inc: { cantidad: 1 } }
            );
            let url = req.file ? await uploadImage(req.file, clave, clave, folder) : req.body.img;

            const newEstilo = new Estilo({
                clave,
                nombre,
                cantidad: parseInt(cantidad),
                precio: parseInt(precio),
                categoria,
                descripcion,
                img: url
            });
            await newEstilo.save();
            res.status(201).json({ existe: false, error: false, message: "Estilo creado correctamente." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: `Error al crear el Estilo: ${error}` });
    }


}

export const getEstilos = async (req, res) => {
    const verEstilos = await Estilo.find()
    console.log(verEstilos);
    res.status(200).json(verEstilos);
}

export const updateEstiloByClave = async (req, res) => {
    console.log(req.body);
    const { Clave, Nombre } = req.params;
    const { clave, nombre, cantidad, precio, categoria, descripcion } = req.body;
    try {
        if (Nombre !== nombre && await Estilo.findOne({ nombre: nombre })) {
            res.status(200).json({ existe: true, error: false, message: `Estilo con nombre: ${nombre} ya esta agregado.` });
        } else {
            let url = req.file ? await uploadImage(req.file, Clave, clave, folder) : req.body.img;
            const newEstilo = {
                clave: clave,
                nombre: nombre,
                cantidad: parseInt(cantidad),
                precio: parseInt(precio),
                categoria: categoria,
                descripcion: descripcion,
                img: url
            };
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
        await Product.findOneAndUpdate(
            { clave: Clave.split('-')[0] },
            { $inc: { cantidad: -1 } }
        )
        await deleteImage(folder, Clave);
        res.status(200).json({ error: false, message: "Estilo eliminado correctamente." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: true, message: `Error al eliminar el estilo: ${error}` });
    }
} 