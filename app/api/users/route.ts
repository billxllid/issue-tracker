import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return NextResponse.json(users);
}