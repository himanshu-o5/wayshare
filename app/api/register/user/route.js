import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  const { firstName, lastName, email, userId } = await req.json();

  try {
    await connectDB();
    let user = await User.findOne({ userId});
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 201 });
    }
    user = await User.create({ firstName, lastName, email, userId});
    return NextResponse.json({ message: "User created successfully", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}