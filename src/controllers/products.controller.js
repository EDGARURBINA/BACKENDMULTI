import Product from "../models/Product"

export const createProduct = async (req, res) => {
    const { nombre, clave, cantidad, tipo } = req.body;
    try {
        const newProduct =  new  Product ({nombre, clave, cantidad, tipo});
        if (await Product.findOne({ clave: clave })) {
            res.status(200).json({ existe: true, error: false, message: `Producto con clave: ${clave} ya esta agregado.` });
        } else {
            await newProduct.save();
            res.status(201).json({ existe: false, error: false, message: "producto creado exitosamente"});
        }
    } catch (error) {
        res.status(500).json({ message: `Error al crear el producto: ${error}` });
        
    }
}



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (error) {
        res.json(error)
    }
}


export const updateProductByClave = async (req, res) => {
    const { Clave } = req.params;
    const { nombre, clave, cantidad, tipo } = req.body;
    try {
        if (Clave === clave) {
            await Product.findOneAndUpdate(
                { clave: clave },
                req.body,
                { new: true }
            );
            res.status(200).json({ existe: false, error: false, message: "Producto actualizado correctamente." });
        } else if (await Product.findOne({ clave: clave })) {
            res.status(200).json({ existe: true, error: false, message: `Producto con clave: ${clave} ya esta agregado.` });
        } else {
            await Product.findOneAndUpdate(
                { clave: Clave },
                req.body,
                { new: true }
            );
            res.status(200).json({ existe: false, error: false, message: "Producto actualizado correctamente." });
        }
    } catch (error) {
        res.status(500).json({ error: true, message: `Error al modificar el  producto: ${error}` });
    }
}

export const deleteProductByClave = async (req, res) => {
    const { Clave } = req.params;
    try {
        await Product.findOneAndDelete({clave: Clave});
        res.status(200).json({ error: false, message: "Producto eliminado correctamente." });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: true, message: `Error al eliminar el producto: ${error}` });
    }
}

