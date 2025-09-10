"use client";

import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueFilterSelect from "./IssueFilterSelect";

const IssueActions = () => {
  return (
    <Flex justify="between" mb="5">
      <IssueFilterSelect />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
