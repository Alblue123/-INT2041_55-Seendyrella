'use client'
import { useState } from 'react';
import React from 'react'
import "@/app/globals.css";

export default function BookUpLoadingPage() {
    const [file, setFile] = useState(null);

    const [error, setError] = useState(null); // Lưu thông báo lỗi

    const [dragging, setDragging] = useState(false); // Trạng thái kéo thả

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      validateFile(selectedFile);
  };

  const handleDragOver = (event) => {
      event.preventDefault(); // Ngăn trình duyệt mở file khi kéo thả
      setDragging(true); // Bật trạng thái kéo
  };

  const handleDragLeave = () => {
      setDragging(false); // Tắt trạng thái kéo
  };

  const handleDrop = (event) => {
      event.preventDefault(); // Ngăn trình duyệt mặc định xử lý file
      setDragging(false); // Tắt trạng thái kéo
      const droppedFile = event.dataTransfer.files[0]; // Lấy file được thả
      validateFile(droppedFile);
  };

  const validateFile = (selectedFile) => {
      if (selectedFile) {
          if (selectedFile.size > 10 * 1024 * 1024) { // 10 MB
              setError("File size exceeds 10 MB. Please choose a smaller file.");
              setFile(null);
          } else {
              setFile(selectedFile);
              setError(null);
          }
      }
  };


    const handleUpLoad = () => {
      if(file) {
        alert(`File "${file.name}" uploaded successfully`);
      }
      else {
        alert('Please select a file first');
      }
    };
    return (
       <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-50 p-12">
        <h2 className='text-2xl font-bold text-blue-800 mb-2'> 
            Your best way to read your document
        </h2>
        <div className="relative flex items-center justify-center min-h-96">
        <div className="relative flex flex-col items-center justify-center w-[450px] h-[350px] rounded-lg"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
        >
    {/* Rectangle Borders */}
    <div className=" absolute inset-0 border-t-[60px] border-l-8 border-r-8 border-b-8 border-white rounded-lg mb-4  z-0"></div>
            <input
               type ="file"
               id = "fileInput"
               style={{ display: 'none' }}
               onChange={handleFileChange}
            
            />
            <label htmlFor= "fileInput" className="items-center text-center cursor-pointer center z-10">
                <img
                src= "images/upload.png"
                alt = "upload image"
                className= "w-22 h-16 mb-4 ml-3.5 relative left-5"
                />
                <p className="text-gray-700 text-[16px] font-bold cursor-pointer">Drag your file or <span className="text-blue-500 underline">browse</span></p>
                <p className="text-sm text-gray-500 font-semibold mb-2">Max 10 MB files are allowed</p>
            </label>

            {/* Error Message */}
            {error && (
                        <p className="text-red-500 text-sm mt-2">
                            {error}
                        </p>
                    )}

            {file && (
                        <p className="text-gray-600 text-sm mt-2">
                            Selected file: <span className="font-semibold">{file.name}</span>
                        </p>
                    )}
            {/* Upload Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition z-10"
          onClick={handleUpLoad}
          disabled={!file} // Disable nếu k có file
        >
          Upload
        </button>
        </div>
        </div>
       </main>
    );
}