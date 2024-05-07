"use client";
import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data: session } = useSession();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <nav className="mb-5 py-3 border-b">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="5">
                        <Link href="/">
                            <FaBug />
                        </Link>
                        <ul className="flex space-x-6">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={classNames({
                                            "text-zinc-900":
                                                currentPath === link.href,
                                            "text-zinc-500":
                                                currentPath !== link.href,
                                            "hover:text-zinc-800 transition-color":
                                                true,
                                        })}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        {status === "authenticated" && (
                            <Link href="/api/auth/signout">Log out</Link>
                        )}
                        {status === "unauthenticated" && (
                            <Link href="/api/auth/signin">Login</Link>
                        )}
                    </Box>
                </Flex>
            </Container>
        </nav>
    );
};

export default NavBar;
