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
    type: String
  }],
  horarioSabado: [{
    type: String
  }]
});

export default mongoose.models.Calendario ||  mongoose.model("Calendario", calendarioSchema);