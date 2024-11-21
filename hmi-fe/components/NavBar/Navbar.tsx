"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { useRouter } from "next/navigation"; 
import "./navBar.css"

export default function NavBar() {
    const router = useRouter();
    return (
        <div>
            {/* desktop */}
            <Navbar className="mobile:hidden tablet:hidden" isBordered>
                <NavbarBrand>
                    <p className="font-bold text-inherit" id = 'seendyrella'>Seendyrella</p>
                </NavbarBrand>
                <NavbarContent justify="end" className = 'navBarButton'>
                    <NavbarItem className="lg:flex font-bold">
                        <Link onClick={() => router.push("/")}>Upload</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold">
                        <Link onClick={() => router.push("/auth/login")}>Your library</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold">
                        <Link onClick={() => router.push("/auth/login")}>Login</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold">
                        {/* <Button as={Link} color="primary" onClick={() => router.push("/auth/register")} variant="flat">
                            Sign Up
                        </Button> */}
                        <Link onClick={() => router.push("/auth/register")}>Sign up</Link>

                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            {/* mobile */}
        </div>
    )
}