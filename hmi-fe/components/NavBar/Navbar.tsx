"use client";

import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import "./navBar.css";

export default function NavBar() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const handleProtectedRoute = (route: string) => {
        if (status === "authenticated") {
            router.push(route);
        } else {
            router.push("/auth/login");
        }
    };

    const renderAuthButtons = () => {
        if (status === "loading") {
            return (
                <NavbarItem className="lg:flex font-bold">
                    <span>Loading...</span>
                </NavbarItem>
            );
        }

        if (status === "authenticated" && session?.user) {
            return (
                <>
                    <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                        <Link onClick={() => handleProtectedRoute("/upload")}>Upload</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                        <Link onClick={() => handleProtectedRoute("/library")}>Your Library</Link>
                    </NavbarItem>
                    <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                        <div className="flex items-center space-x-2">
                            <span className="">
                               Welcome back: {session.user.username} !
                            </span>
                            <Link
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="text-red-500 hover:text-red-700"
                            >
                                Logout
                            </Link>
                        </div>
                    </NavbarItem>
                </>
            );
        }

        return (
            <>
                <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                    <Link onClick={() => handleProtectedRoute("/upload")}>Upload</Link>
                </NavbarItem>
                <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                    <Link onClick={() => handleProtectedRoute("/library")}>Your Library</Link>
                </NavbarItem>
                <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                    <Link onClick={() => router.push("/auth/login")}>Login</Link>
                </NavbarItem>
                <NavbarItem className="lg:flex font-bold hover:cursor-pointer">
                    <Link onClick={() => router.push("/auth/register")}>Sign up</Link>
                </NavbarItem>
            </>
        );
    };

    return (
        <div className="navBar">
            <Navbar isBordered>
                <NavbarContent>
                    <NavbarItem>
                        <p
                            className="font-bold text-inherit hover:cursor-pointer"
                            id='seendyrella'
                            onClick={() => router.push("/")}
                        >
                            Seendyrella
                        </p>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end" className='navBarButton'>
                    {renderAuthButtons()}
                </NavbarContent>
            </Navbar>
        </div>
    );
}