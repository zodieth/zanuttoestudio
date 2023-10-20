import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: Date,
  hora: {
    type: String,
    enum: ["9am", "10am", "11am", "12pm", "14pm", "15pm"],
    required: [true, "El horario es requerido"]
  },
  calendario: {
    type: String,
    enum: ["MUNRO", "SAN-ISIDRO", "GRAND-BOURG", "VIDEOLLAMADA"],
    required: [true, "El calendario es requerido"]
  },
});

export default mongoose.models.Cita || mongoose.model("Cita", citaSchema);
