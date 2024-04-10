import Ticket from "../models/Ticket";


export const createTicket = async (req, res) => {
    const {nombre, telefono, correo, ciudad, estado, numExterior, descripcion} = req.body;
    try {
        const newTicket = new Ticket ({nombre, telefono, correo, ciudad, estado, numExterior, descripcion});
        const ticketSaved = await newTicket.save();
        res.status(201).json({ message: "ticket creado exitosamente", ticket: ticketSaved });
    } catch (error) {
        res.status(500).json({ message: "Error al crear el ticket" });
    }

}

export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los tickets" });
    }
}



export const updateTicket = async (req, res) => {
    const { ticketId } = req.params; 
    const newData = req.body; 
    try {
        const ticket = await Ticket.findByIdAndUpdate(ticketId, newData, { new: true }); 
        if (!ticket) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }
        res.status(200).json({ message: "Ticket actualizado exitosamente", ticket });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el ticket" });
    }
}



export const deleteTicket = async (req, res) => {
    const { ticketId } = req.params; 
    try {
        const ticket = await Ticket.findByIdAndDelete(ticketId); 
        if (!ticket) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }
        res.status(200).json({ message: "Ticket eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el ticket" });
    }
}