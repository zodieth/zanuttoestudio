import mongoose from "mongoose";
const PersonSchema = new mongoose.Schema({
  nombre: { type: String, required: false, default: "" },
  sexo: { type: String, required: [true, "El sexo es requerido"] },
  fecha: { type: String, required: [true, "La fecha es requerida"] },
  fechaDeIngreso: { type: String, required: false },
  hijos: { type: Number, required: false, default: 0 },
  hijosDiscapacidad: { type: Number, required: false, default: 0 },
  hijosAdoptados: { type: Number, required: false, default: 0 },
  num: { type: String, required: [true, "El número es requerido"] },
  aportes: { type: Number, required: true, default: 0 },
  hasta2008: { type: Number, required: false, default: 0 },
  desde2009: { type: Number, required: false, default: 0 },
  hasta2012: { type: Number, required: false, default: 0 },
  desde2012: { type: Number, required: false, default: 0 },
  moratoria: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    enum: ["consulta", "carpeta", "derivado"],
    default: "consulta",
  },
  extranjero: { type: Boolean, default: false },
  auh: { type: Number, default: 0 },
  aportando: { type: Boolean, default: false },
  pension: { type: String, required: false },
  tipoAporte: [{ type: String }],
  dni: { type: String, required: false },
  claveAnses: { type: String, required: false },
  direccion: { type: String, required: false },
  localidad: { type: String, required: false },
  provincia: { type: String, required: false },
});

export default mongoose.models.Person || mongoose.model("Person", PersonSchema);
