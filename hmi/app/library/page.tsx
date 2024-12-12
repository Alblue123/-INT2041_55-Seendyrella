"use client";

import React, { useEffect, useState } from 'react';
import { Trash2, Download } from "lucide-react";
import { Button, Tooltip } from '@nextui-org/react';
import { FaFileAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import puppeteer from 'puppeteer';

interface File {
    id: number;
    document_name: string;
}

export default function FileLibrary() {
    const [files, setFiles] = useState<File[]>([]);
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

    // Handle file deletion
    const handleDelete = async (document_name: string) => {
        try {
            // Confirm deletion
            const confirmation = window.confirm(`Are you sure you want to delete ${document_name}?`);
            if (confirmation) {
                // Make API request to delete file
                const response = await fetch(`/api/library/getContent?document_name=${encodeURIComponent(document_name)}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    // Update state to remove the deleted file by matching document_name
                    setFiles((prevFiles) => prevFiles.filter((file) => file.document_name !== document_name));
                    alert(`${document_name} deleted successfully.`);
                } else {
                    console.error("Failed to delete file");
                    alert("Failed to delete the file.");
                }
            }
        } catch (error) {
            console.error("Error deleting the file:", error);
            alert("An error occurred while deleting the file.");
        }
    };

    const handleExport = async (document_name: string) => {
        try {
            // Fetch content and settings
            const contentResponse = await fetch(`/api/library/getContent?document_name=${document_name}`);
        
            // Check if the response is ok and contains valid data
            if (!contentResponse.ok) {
                throw new Error('Failed to retrieve content or settings.');
            }
        
            const data = await contentResponse.json();
        
            // Validate data
            if (!data || !data.content || !data.settings) {
                throw new Error('Invalid content or settings data.');
            }
        
            const { content, settings } = data;
        
            // Generate PDF by calling the server-side API
            const pdfResponse = await fetch('/api/library/pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    document_name,
                    content,
                    settings
                }),
            });
        
            if (!pdfResponse.ok) {
                throw new Error('Failed to generate PDF.');
            }
        
            // Convert the response to a Blob (PDF file)
            const pdfBlob = await pdfResponse.blob();
        
            // Create a URL for the PDF and trigger a download
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${document_name}.pdf`;
            link.click();
        
            // Alert success
            alert(`${document_name} exported successfully.`);
        } catch (error) {
            // Log and alert the error
            console.error('Error exporting document:', error);
            alert('An error occurred while exporting the document.');
        }
    };
    return (
        <div className="w-full h-screen flex flex-col items-center bg-gray-100 pt-12">
            <h1 className="text-4xl font-bold text-blue-800 pb-12 pt-16">Your Library</h1>
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
                                            <Button size="sm" isIconOnly variant="light" onClick={() => handleExport(file.document_name)}>
                                                <Download className="w-6 h-6 text-gray-400" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content="Delete this document">
                                            <Button size="sm" isIconOnly variant="light"  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(file.document_name);
                                                }}>
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