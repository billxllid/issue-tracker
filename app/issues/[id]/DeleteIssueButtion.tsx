"use client";

import React from "react";
import { Button } from "@radix-ui/themes";

const DeleteIssueButtion = ({ issueId }: { issueId: number }) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteIssueButtion;
