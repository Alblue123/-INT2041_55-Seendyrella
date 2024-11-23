"use client";

import { FC, ReactNode, useRef, useState } from 'react';

interface DocumentLayoutProps {
    children?: ReactNode;
}

const DocumentLayout: FC<DocumentLayoutProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Function to handle page breaking
    const handlePageBreak = () => {
        if (contentRef.current) {
            const content = contentRef.current;
            const pageHeight = content.offsetHeight;
            const totalHeight = content.scrollHeight;
            const pagesCount = Math.ceil(totalHeight / pageHeight);
            setTotalPages(pagesCount);
        }
    };

    // Function to navigate to a specific page
    const goToPage = (pageNumber: number) => {
        if (contentRef.current) {
            const content = contentRef.current;
            const pageHeight = content.offsetHeight;
            content.scrollTop = (pageNumber - 1) * pageHeight;
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="min-h-screen bg-[#E6E9F0]">
            {/* Main container that centers content */}
            <div className="max-w-7xl mx-auto px-4 py-8 h-full min-h-screen">
                {/* Paper-like white background */}
                <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8">
                    {/* Content area */}
                    <div
                        ref={contentRef}
                        className="max-w-[816px] mx-auto overflow-auto"
                        onScroll={handlePageBreak}
                    >
                        {children}
                    </div>
                    {/* Page navigation */}
                    <div className="mt-4 text-center">
                        Page {currentPage} of {totalPages}
                        <button
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentLayout;