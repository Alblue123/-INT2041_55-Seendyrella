"use client";

import React from 'react';
import { Trash2, Download } from "lucide-react";
import { Button, Tooltip } from '@nextui-org/react';
import { FaFileAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const files = [
    {
        name: "I am Dumb",
    },
    {
        name: "I dont know what to say",
    },
    {
        name: "Choi phai phai khong",
    },
    {
        name: "Tai vi sao",
    },
    {
        name: "Peter dodle",
    },
];

export default function FileLibrary() {
    const router = useRouter();
    
    return (
        <>
            <div className="w-full h-screen flex flex-col items-center bg-gray-100 pt-12">
                <h1 className="flex justify-center text-4xl font-bold text-blue-800 pb-12">Your Library</h1>

                {/* Centering the table */}
                <div className="overflow-x-auto w-[60rem]">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
                        <thead>
                            <tr className="border-b">
                                <th className="p-4 font-semibold text-lg text-left text-[#1849D6]">File</th>
                                <th className="p-4 font-semibold text-lg text-right text-[#1849D6]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {files.map((file, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 hover:cursor-pointer" onClick={() => router.push("/reading")}>
                                    <td className="p-4">
                                        <div className="flex flex-row items-center gap-2 justify-start">
                                            <FaFileAlt/>
                                            <p className="font-medium text-gray-900 text-lg">{file.name}</p>
                                        </div>
                                    </td>
                                    <td className="p-2">
                                        <div className="flex justify-end items-center gap-4">
                                            <Tooltip content="Download this book">
                                                <Button className="" size='sm' isIconOnly variant='light'>
                                                    <Download className="w-6 h-6 text-gray-400" />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Delete this book">
                                                <Button className="" size='sm' isIconOnly variant='light'>
                                                    <Trash2 className="w-6 h-6 text-red-500" />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

