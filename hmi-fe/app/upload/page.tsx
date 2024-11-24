"use client";
import { useState } from "react";
import React from "react";
import "@/app/globals.css";

export default function BookUpLoadingPage() {
    const [file, setFile] = useState<File | null>(null); 
    const [error, setError] = useState<string | null>(null); // Lưu thông báo lỗi
    const [dragging, setDragging] = useState(false); // Trạng thái kéo thả
    const [responseMessage, setResponseMessage] = useState<string | null>(null); // Lưu thông báo phản hồi từ server

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            validateFile(selectedFile);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Ngăn trình duyệt mở file khi kéo thả
        setDragging(true); // Bật trạng thái kéo
    };

    const handleDragLeave = () => {
        setDragging(false); // Tắt trạng thái kéo
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Ngăn trình duyệt mặc định xử lý file
        setDragging(false); // Tắt trạng thái kéo

        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            validateFile(droppedFile);
        }
    };

    const validateFile = (selectedFile: File) => {
        setError(null);
        setResponseMessage(null);
        setFile(null); // Always reset the current file and message states

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError("File size exceeds 10 MB. Please choose a smaller file.");
        } else {
            setFile(selectedFile);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Failed to upload: ${res.statusText}`);
            }

            const result = await res.json();
            setResponseMessage(result.message);

            setFile(null);
            alert(`File "${file.name}" uploaded successfully`);
        } catch (err) {
            console.error("Upload failed:", err);
            setResponseMessage("Upload failed. Please try again.");
        }
    };

    return (
        <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-50 p-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
                Your best way to read your document
            </h2>
            <div className="relative flex items-center justify-center min-h-96">
                <div
                    className={`relative flex flex-col items-center justify-center w-[450px] h-[350px] rounded-lg ${
                        dragging ? "bg-blue-100" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="absolute inset-0 border-t-[60px] border-l-8 border-r-8 border-b-8 border-white rounded-lg mb-4 z-0"></div>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="fileInput"
                        className="items-center text-center cursor-pointer center z-10"
                    >
                        <img
                            src="images/upload.png"
                            alt="upload image"
                            className="w-22 h-16 mb-4 ml-3.5 relative left-5"
                        />
                        <p className="text-gray-700 text-[16px] font-bold cursor-pointer">
                            Drag your file or <span className="text-blue-500 underline">browse</span>
                        </p>
                        <p className="text-sm text-gray-500 font-semibold mb-2">
                            Max 10 MB files are allowed
                        </p>
                    </label>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    {file && (
                        <div className="text-gray-600 text-sm mt-2 text-center px-2 break-words">
                            Selected file: <span className="font-semibold">{file.name}</span>
                        </div>
                    )}

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition z-10"
                        onClick={handleUpload}
                        disabled={!file}
                    >
                        Upload
                    </button>

                    {responseMessage && (
                        <p className="text-gray-600 text-sm mt-4">{responseMessage}</p>
                    )}
                </div>
            </div>
        </main>
    );
}
