import Ticket from "../models/Ticket";

const obtenerFechaFormateada = () => {
    const fechaActual = new Date();

    // Extraer componentes de la fecha
    const dia = fechaActual.getDate().toString().padStart(2, '0'); // Día con dos dígitos (agregar cero al inicio si es necesario)
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (agregar cero al inicio si es necesario)
    const anio = fechaActual.getFullYear(); // Año con cuatro dígitos

    // Construir la fecha en formato DD/MM/YYYY
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    return fechaFormateada;
};

const obtenerHoraActual = () => {
    const fechaActual = new Date();

    // Extraer componentes de la hora
    const hora = fechaActual.getHours().toString().padStart(2, '0'); // Hora con dos dígitos (agregar cero al inicio si es necesario)
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos (agregar cero al inicio si es necesario)

    // Construir la hora en formato hh:mm
    const horaConMinutos = `${hora}:${minutos}`;

    return horaConMinutos;
};
export const createTicket = async (req, res) => {
    const { nombre, telefono, correo, ciudad, estado, productos } = req.body;
    try {
        const newTicket = new Ticket({ nombre, telefono, correo, fecha: obtenerFechaFormateada(), hora: obtenerHoraActual(), ciudad, estado, productos: [...productos] });
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