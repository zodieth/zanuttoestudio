import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  fecha: Date,
  hora: {
    type: String,
    enum: ["8" ,"9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "allDay"],
    required: [true, "Error en el horario"]
},
  calendario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Calendario",
  },
  idInc: { type: Number, required:false }
});

export default mongoose.models.Cita || mongoose.model("Cita", citaSchema);
