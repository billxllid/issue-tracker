"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children as React.ReactNode}</SessionProvider>;
};

export default AuthProvider;
