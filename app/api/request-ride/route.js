import connectDB from "@/lib/connectDB";
import RequestRide from "@/models/RequestRide";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const {
    userId,
    firstName,
    lastName,
    source,
    sourceCoordinates,
    destination,
    destinationCoordinates,
    date,
    carSelected,
    distance,
    amount
  } = await req.json();
  try {
    await connectDB();
    const newRide = await RequestRide.create({ userId, firstName, lastName, source, sourceCoordinates, destination, destinationCoordinates, date, carSelected, distance, amount });
    
    return NextResponse.json(
      { message: "Ride created successfully", newRide },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating Ride:", error);
    return NextResponse.json(
      { message: "Error creating Ride" },
      { status: 500 }
    );
  }
};
