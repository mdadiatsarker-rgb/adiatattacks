// app/api/login/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { username, password } = await request.json();

    // ডাটাবেস থেকে ইউজার খোঁজা
    const user = await User.findOne({ username, password });

    if (user) {
      if (user.isBanned) {
        return NextResponse.json({ message: "⛔ YOU ARE BANNED!" }, { status: 403 });
      }
      return NextResponse.json({ message: "SUCCESS", role: user.role }, { status: 200 });
    } else {
      return NextResponse.json({ message: "INVALID CREDENTIALS" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "SERVER ERROR" }, { status: 500 });
  }
}