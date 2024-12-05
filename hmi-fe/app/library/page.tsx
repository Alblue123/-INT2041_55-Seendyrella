"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, Download } from "lucide-react";
import { Button, Tooltip } from '@nextui-org/react';
import { FaFileAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

interface File {
    id: number;
    document_name: string;
}

export default function FileLibrary() {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedContent, setSelectedContent] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchFiles = async () => {
            const usernameResponse = await fetch("/api/auth/user", { method: "GET" });
            if (!usernameResponse.ok) {
                console.error("Failed to retrieve username");
                return;
            }
        
            const { username } = await usernameResponse.json();
            console.log("Username retrieved:", username);
        
            const response = await fetch(`/api/library/getFile?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setFiles(data.files);
            } else {
                console.error("Failed to fetch files");
            }
        };
        fetchFiles();
    }, []);

    const handleFileClick = (document_name: string) => {
        try {
            // Pass only the document_name to the reading page
            router.push(`/reading?document_name=${encodeURIComponent(document_name)}`);
        } catch (error) {
            console.error("Failed to navigate to reading page:", error);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center bg-gray-100 pt-12">
            <h1 className="text-4xl font-bold text-blue-800 pb-12">Your Library</h1>
            <div className="overflow-x-auto w-[60rem]">
                <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 font-semibold text-lg text-left text-[#1849D6]">File</th>
                            <th className="p-4 font-semibold text-lg text-right text-[#1849D6]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr
                                key={file.id}
                                className="border-b hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleFileClick(file.document_name)} 
                            >
                                <td className="p-4">
                                    <div className="flex flex-row items-center gap-2">
                                        <FaFileAlt />
                                        <p className="font-medium text-gray-900 text-lg">{file.document_name}</p>
                                    </div>
                                </td>
                                <td className="p-2">
                                    <div className="flex justify-end items-center gap-4">
                                        <Tooltip content="Download this document">
                                            <Button size="sm" isIconOnly variant="light">
                                                <Download className="w-6 h-6 text-gray-400" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content="Delete this document">
                                            <Button size="sm" isIconOnly variant="light">
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
    );
}