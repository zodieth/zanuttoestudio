import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: Date,
  hora: String,
  calendario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Calendario",
  },
});

export default mongoose.model.Cita || mongoose.model("Cita", citaSchema);
