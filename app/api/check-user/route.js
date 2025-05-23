import connectDB from "@/lib/connectDB";
import Driver from "@/models/Driver";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId } = await req.json();
  try {
    await connectDB();
    let user;

    user = await Driver.findOne({ driverId: userId });
    if (user) {
      return NextResponse.json({ message: "driver", user }, { status: 201 });
    }

    user = await User.findOne({ userId: userId });
    if (user) {
      return NextResponse.json({ message: "user", user }, { status: 201 });
    }
    
    return NextResponse.json(
      { message: "user does not exist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
};
