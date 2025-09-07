import { IssueSchema } from "@/app/validationSchemas";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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