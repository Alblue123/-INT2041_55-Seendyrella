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
        <div className="w-full max-w-6xl mx-auto p-4">
            <h1 className="flex justify-center text-4xl font-bold text-blue-800 mb-8">Your Library</h1>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-4 font-semibold text-gray-700">File</th>
                            <th className="p-4 font-semibold text-gray-700">Created At</th>
                            <th className="p-4 font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => (
                            <tr key={file.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={file.avatar}
                                            alt={file.name}
                                            className="w-8 h-8 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900">{file.name}</p>
                                            <p className="text-sm text-gray-500">{file.department}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-600">
                                    {file.department}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <button className="p-2 hover:bg-gray-100 rounded-full">
                                            <Download className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full">
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

