import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const Link = ({ href, children, className, ...props }: LinkProps) => {
  return (
    <RadixLink asChild>
      <NextLink href={href} className={className} {...props}>
        {children}
      </NextLink>
    </RadixLink>
  );
};

export default Link;
