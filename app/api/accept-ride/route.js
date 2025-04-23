import connectDB from "@/lib/connectDB";
import Driver from "@/models/Driver";
import RequestRide from "@/models/RequestRide";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { rideId, driverId } = await req.json();
  try {
    await connectDB();
    const driver = await Driver.findOne({ driverId: driverId });
    if (!driver) {
      return NextResponse.json(
        { message: "Driver not found" },
        { status: 404 }
      );
    }
    const updatedRide = await RequestRide.findOneAndUpdate(
      { _id: rideId },
      { status: "accepted", driverId: driverId, driverName: driver.firstName + (driver.lastName ? " " + driver.lastName : ""), carNumber: driver.carNumber, phone: driver.phone, carColor: driver.carColor, carType: driver.carType },
      { new: true }
    );
    if (!updatedRide) {
      return NextResponse.json(
        { message: "Ride not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Ride accepted successfully", updatedRide },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Ride:", error);
    return NextResponse.json(
      { message: "Error creating Ride" },
      { status: 500 }
    );
  }
};
