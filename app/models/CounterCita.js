import mongoose from "mongoose";
const CounterCitaSchema = new mongoose.Schema({
    id: { type: String },
    seq: { type: Number }
})
export default mongoose.models.CounterCita || mongoose.model("CounterCita", CounterCitaSchema);