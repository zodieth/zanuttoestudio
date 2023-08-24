import mongoose from "mongoose";
const DetalleSchema = new mongoose.Schema({
    año: [{type: String}],

    cantidadMeses: [{type: Number, default: 0}],

    tipoDeAporte: [{
        type: String,
        enum: ["sin aportes" ,"monotributo", "IPS", "servicio domestico", "dependencia"],
        required: [true, "El tipo de aporte es requerido"]
    }],

    persona: {
        type: mongoose.Schema.ObjectId,
        ref: "Person"
    }
});

export default mongoose.models.Detalle || mongoose.model("Detalle", DetalleSchema);
