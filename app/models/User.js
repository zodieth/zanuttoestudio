import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
