"use client";

import { Button, Card, CardBody, CardHeader, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function RegisterForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify({
                username: formData.get("username"),
                email: formData.get("email"),
                password: formData.get("password"),
            }),
        });
        console.log({ response });
    };
    const router = useRouter();
    return (
        <div className="min-h-screen w-full flex">
            {/* Left side - Background Image */}
            <div className="hidden desktop:block desktop:w-1/3 laptop:block laptop:w-1/3 relative bg-auth-image">
                <div className="absolute bottom-8 left-8 text-white text-sm">
                    <p>© 2024 Seendyrella</p>
                </div>
            </div>

            {/* Right side - Sign Up Form */}
            <div className="w-full desktop:w-2/3 laptop:w-2/3 flex items-center justify-center p-8
            desktop:bg-gray-50
            laptop:bg-gray-50
            mini-laptop:bg-auth-image
            tablet:bg-auth-image
            mobile:bg-auth-image
            ">
                <Card className="w-full max-w-lg">
                    <CardHeader className="flex-col space-y-1">
                        <p className="text-3xl desktop:text-4xl font-bold text-center text-blue-600">
                            Sign Up
                        </p>
                        <p className="desktop:text-lg laptop:text-base text-center text-gray-600 hidden">
                            Seendyrella Welcome back
                        </p>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="desktop:text-base laptop:text-base text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="desktop:text-base laptop:text-base text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="desktop:text-base laptop:text-base text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="desktop:text-base laptop:text-base text-sm font-medium text-gray-700">
                                    Retype password
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Retype password"
                                    className="w-full"
                                />
                            </div>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                            <div className="text-center text-sm text-gray-600">
                                Already had an account?{' '}
                                <Link onClick={() => router.push("./login")} className="text-blue-600 hover:underline hover:cursor-pointer">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}