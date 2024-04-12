import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" },
    ];

    return (
        <nav className="flex items-center mb-5 p-5 border-b space-x-6">
            <Link href="/">
                <FaBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={classNames({
                                "text-zinc-900": currentPath === link.href,
                                "text-zinc-500": currentPath !== link.href,
                                "hover:text-zinc-800 transition-color": true,
                            })}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
