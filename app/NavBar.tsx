"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";
import Spinner from "./components/Spinner";
import { Button } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const { status, data: session } = useSession();

  return (
    <nav className="flex space-x-6 border-b border-b-neutral-300 mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classNames({
                "text-zinc-900":
                  currentPath === link.href ||
                  (link.href !== "/" && currentPath.startsWith(link.href)),
                "text-zinc-500": !(
                  currentPath === link.href ||
                  (link.href !== "/" && currentPath.startsWith(link.href))
                ),
                "hover:text-zinc-800 transform-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "loading" && <Spinner />}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Login</Link>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Logout</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
