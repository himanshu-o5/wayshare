import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Avoid redefining the model during hot reloads in dev
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
