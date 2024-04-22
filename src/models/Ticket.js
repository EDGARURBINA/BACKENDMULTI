import { Schema, model } from "mongoose";

const ticketCounterSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 }
});

const TicketCounter = model("TicketCounter", ticketCounterSchema);

async function getNextTicketNumber() {
    const doc = await TicketCounter.findByIdAndUpdate(
        { _id: "ticketNumber" }, 
        { $inc: { sequence_value: 1 } }, 
        { new: true, upsert: true } 
    );
    return doc.sequence_value;
}
const ticketSchema = new Schema({
    numeroTicket: {
        type: Number,
        unique: true,
        default: () => getNextTicketNumber() 
    },
    nombre: {
        type: String,
    },
    telefono: {
        type: Number,
    },
    correo: {
        type: String,
    },
    fecha: {
        type:String,
        require: true
    },
    hora:{
        type:String,
        require: true
    },
    ciudad: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }]
});

export default model("Ticket", ticketSchema);



