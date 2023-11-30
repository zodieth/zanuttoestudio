import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: Date,
  hora: String,
  calendario: {
    type: String,
    required: [true, "El calendario es requerido"]
  },
});

export default mongoose.models.Cita || mongoose.model("Cita", citaSchema);
