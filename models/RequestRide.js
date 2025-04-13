import mongoose from "mongoose";

const RequestRideSchema = new mongoose.Schema({
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
  source: {
    type: String,
    required: true,
  },
  sourceCoordinates: {
    type: [Number],
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  destinationCoordinates: {
    type: [Number],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  carSelected: {
    type: String,
    required: true,
  },
  distance:{
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  }
});

// Avoid redefining the model during hot reloads in dev
const RequestRide = mongoose.models.RequestRide || mongoose.model("RequestRide", RequestRideSchema);

export default RequestRide;
