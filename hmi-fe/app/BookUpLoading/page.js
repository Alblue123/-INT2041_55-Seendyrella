import React from 'react'
import "@/app/globals.css";

export default function BookUpLoadingPage() {
    return (
       <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-50 p-12">
        <h2 className='text-2xl font-bold text-blue-800 mb-2'> 
            Your best way to read your document
        </h2>
        <div className="flex items-center justify-center min-h-96">
        <div className="relative flex flex-col items-center justify-center w-[450px] h-[350px] rounded-lg">
    {/* Rectangle Borders */}
    <div className="absolute inset-0 border-t-[60px] border-l-8 border-r-8 border-b-8 border-white rounded-lg mb-4"></div>

            <label className="items-center text-center cursor-pointer center ">
                <img
                src= "images/upload.png"
                alt = "upload image"
                className= "w-22 h-16 mb-4 ml-3.5 relative left-5"
                />
                <p className="text-gray-700 text-[16px] font-bold">Drag your file or <span className="text-blue-500 underline">browse</span></p>
                <p className="text-sm text-gray-500 font-semibold mb-2">Max 10 MB files are allowed</p>
            </label>
            {/* Upload Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Upload
        </button>
        </div>
        </div>
       </main>
    );
}