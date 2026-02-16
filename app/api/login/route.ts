import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { username, password } = await request.json();

    // ডাটাবেজ থেকে ইউজার এবং পাসওয়ার্ড সরাসরি চেক করা
    const user = await User.findOne({ username, password });

    if (user) {
      if (user.isBanned) {
        return NextResponse.json({ message: "BANNED" }, { status: 403 });
      }
      // মেসেজটি অবশ্যই "SUCCESS" হতে হবে ফ্রন্টএন্ডের সাথে মিলানোর জন্য
      return NextResponse.json({ 
        message: "SUCCESS", 
        role: user.role 
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: "INVALID CREDENTIALS" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "SERVER ERROR" }, { status: 500 });
  }
}