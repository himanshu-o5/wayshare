import connectDB from "@/lib/connectDB";
import Driver from "@/models/Driver";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const { firstName, lastName, email, driverId, phone, carType, carColor, carNumber, fuelType, seatingCapacity } = await req.json();

  try {
    await connectDB();
    let driver = await Driver.findOne({ driverId});
    if (driver) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 201 }
      );
    }
    driver = await Driver.create({
      firstName,
      lastName,
      email,
      driverId,
      phone,
      carType,
      carColor,
      carNumber,
      fuelType,
      seatingCapacity,
    });
    return NextResponse.json(
      { message: "Driver created successfully", driver },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating driver:", error);
    return NextResponse.json(
      { message: "Error creating driver" },
      { status: 500 }
    );
  }
};
