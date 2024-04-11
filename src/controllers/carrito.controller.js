import Cart from "../models/Carrito"


export const createCarrito = async  (req, res) =>{

    const { user, items , totalPrice} = req.body;
    try {
        const newCart = new Cart({ user, items, totalPrice });
        const cartSaved = await newCart.save();
        res.status(201).json({ message: "Carrito creado exitosamente", cart: cartSaved });
      } catch (error) {
        res.status(500).json({ message: "Error al crear el carrito" });
      }
    }

    export const getCarritos = async (req, res) =>{
        try {
            const carts = await Cart.find().populate('items.product');
            res.json(carts);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los carritos' });
          }
    }

    export const getCartById = async (req, res) => {
        const carrito = await Cart.findById(req.params.carritoId)
        res.status(200).json(carrito)
      };


      
      export const updateCarritoById = async (req , res) =>{
        const updateCarrito = await Cart. findByIdAndUpdate(req.params.carritoId, req.body,{
            new: true
        })
        res.status(200).json(updateCarrito)
      }

      export const deleteCarritoById = async (req, res) => {
        const { carritoId } = req.params;
        try {
            await Cart.findByIdAndDelete(carritoId);
            res.status(204).json({ message: "Carrito eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el carrito" });
        }
    }




