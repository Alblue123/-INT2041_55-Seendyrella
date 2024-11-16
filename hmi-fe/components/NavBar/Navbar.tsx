"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const router = useRouter();
    return (
        <div>
            {/* desktop */}
            <Navbar className="mobile:hidden tablet:hidden" isBordered>
                <NavbarBrand>
                    <p className="font-bold text-inherit">Seendyrella</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem className="lg:flex font-bold">
                        <Link onClick={() => router.push("/")}>Upload</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold">
                        <Link onClick={() => router.push("/auth/login")}>Your library</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold">
                        <Link onClick={() => router.push("/auth/login")}>Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" onClick={() => router.push("/auth/register")} variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            
            {/* mobile */}
            

        </div>
    )
}