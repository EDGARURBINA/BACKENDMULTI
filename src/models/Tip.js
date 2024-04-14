import { Schema, model } from "mongoose";

const tipSchema = new Schema({
    tip: {
        type: Number,
        required: true
    },
    semana1: {
        type: Number,
        required: true
    },
    semana2: {
        type: Number,
        required: true
    },
    semana3: {
        type: Number,
        required: true
    }
});

export default model("Tip", tipSchema);
