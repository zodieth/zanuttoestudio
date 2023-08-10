const mongoose = require("mongoose");

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

module.exports = mongoose.model("Cita", citaSchema);
