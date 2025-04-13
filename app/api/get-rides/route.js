import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import RequestRide from "@/models/RequestRide";

export const GET = async (req) => {
  try {
    const userId = req.headers.get("userId"); // Extract userId from headers
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    // Connect to the database
    await connectDB();
    const rides = await RequestRide.find({ userId: userId }).sort({ date: -1 });
    return NextResponse.json(rides);
  } catch (error) {
    console.error("Error fetching rides:", error);
    return NextResponse.json(
      { error: "Failed to fetch rides" },
      { status: 500 }
    );
  }
};
