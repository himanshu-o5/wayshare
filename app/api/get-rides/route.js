import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import RequestRide from "@/models/RequestRide";

export const GET = async (req) => {
  try {
    const userId = req.headers.get("userId"); // Extract userId from headers
    const driverId = req.headers.get("driverId"); // Extract driverId from headers
    
    if(userId){
      // Connect to the database
      await connectDB();
      const rides = await RequestRide.find({ userId: userId }).sort({ date: -1 });
      return NextResponse.json(rides);
    }
    else if(driverId){
      // Connect to the database
      await connectDB();
      const rides = await RequestRide.find({ status: "pending" });
      console.log(rides);
      return NextResponse.json(rides);
    }


    if (!userId && !driverId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching rides:", error);
    return NextResponse.json(
      { error: "Failed to fetch rides" },
      { status: 500 }
    );
  }
};
