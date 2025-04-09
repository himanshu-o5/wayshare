import mongoose from "mongoose";

// driver = await Driver.create({
//   ,
//   ,
//   ,
//   ,
//   phone,
//   carType,
//   carColor,
//   carNumber,
//   fuelType,
//   seatingCapacity,
// });

const DriverSchema = new mongoose.Schema({
  driverId: {
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
  phone: {
    type: Number,
    required: true,
  },
  carType: {
    type: String,
    required: true,
  },
  carColor: {
    type: String,
    required: true,
  },
  carNumber: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  }
});

// Avoid redefining the model during hot reloads in dev
const Driver = mongoose.models.Driver || mongoose.model("Driver", DriverSchema);

export default Driver;
