import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: {
    type: Date,
    expires: 172800
  },
  hora: {
    type: String,
    enum: ["9", "10", "11", "12", "14", "15"],
    required: [true, "El horario es requerido"]
  },
  calendario: {
    type: String,
    required: [true, "El calendario es requerido"]
  },
});

export default mongoose.models.Cita || mongoose.model("Cita", citaSchema);
