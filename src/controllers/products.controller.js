import Product from "../models/Product"

export const createProduct = async (req, res) => {
    const { nombre, clave, cantidad, tipo } = req.body;
    try {
        const newProduct =  new  Product ({nombre, clave, cantidad, tipo});
        const productSaved = await newProduct.save();

        res.status(201).json({ message: "producto creado exitosamente", product: productSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto" });
        
    }
}



export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products)
}

export const getProducById = async (req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product)

}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedProduct)
}

export const deleteProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        await Product.findByIdAndDelete(productId);
        res.status(204).end();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Error al eliminar el producto" });
    }
}

