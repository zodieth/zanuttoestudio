const mongoose = require("mongoose");

const calendarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"]
  },
  direccion: {
    type: String,
    //required: [true, "La direccion es requerida"]
  },
  color: {
    type: String,
    required: [true, "El color es requerido"]
  },
  horarioSemana: [{
    type: String,
  required: [true, "Debe ingresar el horario de la oficina"]
  }],
  horarioSabado: [{
    type: String,
  required: [true, "Debe ingresar el horario de la oficina"]}]
});

export default mongoose.models.Calendario ||  mongoose.model("Calendario", calendarioSchema);