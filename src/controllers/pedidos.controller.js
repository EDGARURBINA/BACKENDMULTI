import Pedido from "../models/Pedido";

export const crearPedido = async (req, res) =>{
    const { user, items, totalPrice } = req.body;
    try {
        const newPedido = new Pedido ({ user, items, totalPrice });
        const pedidoSaved = await newPedido.save();
        res.status(201).json({ message: "Pedido creado exitosamente", pedido: pedidoSaved });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el pedido" });
    }
}

export const getPedidos = async (req, res) =>{
    try {
        const pedidos = await Pedido.find();
        res.json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
}

export const getPedidoById = async (req, res) => {
    const { pedidoId } = req.params;
    try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el pedido' });
    }
};

export const actualizarPedidoById = async (req, res) => {
    const { pedidoId } = req.params;
    const { user, items, totalPrice, status } = req.body;
    try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        pedido.user = user;
        pedido.items = items;
        pedido.totalPrice = totalPrice;
        pedido.status = status;

        const pedidoActualizado = await pedido.save();
        res.status(200).json({ message: "Pedido actualizado exitosamente", pedido: pedidoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el pedido' });
    }
}

export const deletePedidoById = async (req, res) => {
    const { pedidoId } = req.params;
    try {
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        await Pedido.deleteOne({ _id: pedidoId }); 
        res.status(204).json({ message: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el pedido' });
    }
};