"use client";
import {
    Avatar,
    Box,
    Container,
    DropdownMenu,
    Flex,
    Skeleton,
    Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    return (
        <nav className="mb-5 py-3 border-b">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="5">
                        <Link href="/">
                            <FaBug />
                        </Link>
                        <NavLinks />
                    </Flex>
                    <AuthComponent />
                </Flex>
            </Container>
        </nav>
    );
};

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <ul className="flex space-x-6">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={classNames({
                            "text-zinc-900": currentPath === link.href,
                            "nav-link": currentPath !== link.href,
                        })}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthComponent = () => {
    const { status, data: session } = useSession();

    if (status === "loading") return <Skeleton width="3rem" height="1.5rem" />;

    if (status === "unauthenticated")
        return (
            <Link className="nav-link" href="/api/auth/signin">
                Login
            </Link>
        );

    return (
        <Box>
            <DropdownMenu.Root dir="rtl">
                <DropdownMenu.Trigger>
                    <Avatar
                        src={session!.user!.image!}
                        fallback="?"
                        radius="full"
                        className="cursor-pointer"
                        referrerPolicy="no-referrer"
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">{session!.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Log out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
};

export default NavBar;
