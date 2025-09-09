import { IssueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validation = IssueSchema.safeParse(body);
  if (!validation.success) 
    return NextResponse.json({ error: validation.error.issues }, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt((await params).id) },
  });
  if (!issue) 
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title: validation.data.title, description: validation.data.description },
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