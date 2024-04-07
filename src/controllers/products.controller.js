import Product from "../models/Product"

export const createProduct = async (req, res) => {
    const { nombre, estilos, clave } = req.body;
    const newEstilos = []
    for (const estilo of estilos) {
        estilo.claveStyle = `${clave}-${estilo.nombreStyle}`
        newEstilos.push(estilo)
    }
    console.log(newEstilos);
    try {
        const newProduct = new Product({
            nombre,
            estilos, 
            clave 
        });
        
        const productSaved = await newProduct.save();

        res.status(201).json(productSaved);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

