import React from 'react';
import { Trash2, Download } from "lucide-react";

interface FileItem {
    id: string;
    name: string;
    department: string;
    avatar: string;
}

const files: FileItem[] = [
    {
        id: "1",
        name: "Lindsey Stroud",
        department: "Technology Department",
        avatar: "/api/placeholder/32/32",
    },
    {
        id: "2",
        name: "Sarah brown",
        department: "Technology Department",
        avatar: "/api/placeholder/32/32",
    },
    {
        id: "3",
        name: "Micheal Owen",
        department: "Technology Department",
        avatar: "/api/placeholder/32/32",
    },
    {
        id: "4",
        name: "Mary Jane",
        department: "Technology Department",
        avatar: "/api/placeholder/32/32",
    },
    {
        id: "5",
        name: "Peter dodle",
        department: "Technology Department",
        avatar: "/api/placeholder/32/32",
    },
];

export default function FileLibrary() {
    return (
        <>
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <h1 className="flex justify-center text-4xl font-bold text-blue-800 mb-8">Your Library</h1>

            {/* Centering the table */}
            
            <div className="overflow-x-auto w-[60rem]">
                <table className="w-full border-collapse bg-white rounded-lg shadow-lg">

                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-6 font-semibold text-gray-700 text-lg">File</th>
                            <th className="p-6 font-semibold text-gray-700 text-lg">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id} className="border-b hover:bg-gray-50">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={file.avatar}
                                            alt={file.name}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900 text-lg">{file.name}</p>
                                            <p className="text-sm text-gray-500">{file.department}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center gap-6">
                                        <button className="p-3 hover:bg-gray-100 rounded-full">
                                            <Download className="w-6 h-6 text-gray-400" />
                                        </button>
                                        <button className="p-3 hover:bg-gray-100 rounded-full">
                                            <Trash2 className="w-6 h-6 text-red-500" />
                                        </button>
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

