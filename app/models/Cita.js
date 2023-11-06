import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: Date,
  hora: {
    type: String,
    enum: ["9", "10", "11", "12", "14", "15"],
    required: [true, "El horario es requerido"]
  },
  calendario: {
    type: String,
    enum: ["MUNRO", "SAN-ISIDRO", "GRAND-BOURG", "VIDEOLLAMADA"],
    required: [true, "El calendario es requerido"]
  },
});

export default mongoose.models.Cita || mongoose.model("Cita", citaSchema);
