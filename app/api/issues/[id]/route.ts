import { AssignIssueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  // Authenticate the user
  const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // Find the issue
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!issue) 
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  // Validate the request body
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
  const validation = AssignIssueSchema.safeParse(body);
  if (!validation.success) 
    return NextResponse.json({ error: validation.error.issues }, { status: 400 });
  
  // if the assignedToId is provided, we need to check if the user exists
  const { assignedToId, title, description } = validation.data;
  if (assignedToId) {
    const assignedTo = await prisma.user.findUnique({
      where: { id: assignedToId },
    });
    if (!assignedTo)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, assignedToId },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return NextResponse.json({});
}