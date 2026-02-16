import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { username, password, role } = await request.json();

    // ১. চেক করা যে ইউজার আগে থেকেই আছে কি না
    const userExists = await User.findOne({ username: username.trim() });
    
    if (userExists) {
      console.log("❌ User already in database:", username);
      return NextResponse.json({ message: "Exists" }, { status: 400 });
    }

    // ২. নতুন ইউজার সেভ করা
    const newUser = new User({
      username: username.trim(),
      password: password,
      role: role || "user",
      isBanned: false
    });

    await newUser.save();
    console.log("✅ New User Saved:", username);
    return NextResponse.json({ message: "Success" }, { status: 201 });

  } catch (error: any) {
    console.error("🔥 Server Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}