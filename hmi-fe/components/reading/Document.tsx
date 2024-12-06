"use client";

import { FC, ReactNode, useRef, useState } from 'react';
import { useFormatting } from './formatting/UseFormatting';
import Sidebar from './tools/summarize'
interface DocumentLayoutProps {
    children?: ReactNode;
}

const DocumentLayout: FC<DocumentLayoutProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    const {
        fontSize,
        fontFamily,
        fontWeight,
        fontStyle,
        textDecoration,
        lineHeight,
        letterSpacing
    } = useFormatting();

     const [text, setText] = useState('');
     const [summary, setSummary] = useState('');
     //const [loading, setLoading] = useState(false);
     const [isSidebarOpen, setSidebarOpen] = useState(false);

     const handleSummarize = async () => {
        if (!contentRef.current) {
            console.error('Content is empty');
            return;
        }
         //setLoading(true);
         setSummary(''); 
        try {
             const textContent = contentRef.current.innerText;
             const response = await fetch('https://1b70-34-74-99-133.ngrok-free.app', {
             method: 'POST',
             headers: {
                     'Content-Type': 'application/json',
                        },
             body: JSON.stringify({
             text: textContent,
             ratio: 0.2, // chỉnh tỉ lệ tóm tắt
             }),
      });
         const data = await response.json();
      
         console.log('Summary:', data.summary);
         setSummary(data.summary);
         } catch (error) {
              console.error('Error summarizing:', error);
             setSummary('Error summarizing text. Please try again later.');
         }
            // setLoading(false);
  };

    return (
        <div className="min-h-screen bg-[#E6E9F0] pt-28">
            <div className={`max-w-7xl mx-auto px-4 py-8 h-full min-h-screen transition-all ${isSidebarOpen ? 'mr-80' : ''}`}>
              <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8">
                    
               
                    <div
                        ref={contentRef}
                        className={`
                            py-8
                            max-w-5xl 
                            mx-auto 
                            overflow-auto
                            font-${fontWeight}
                            ${fontStyle === 'italic' ? 'italic' : ''}
                            ${textDecoration === 'underline' ? 'underline' : ''}
                        `}
                        style={{
                            fontSize: `${fontSize}px`,
                            fontFamily: fontFamily,
                            lineHeight: lineHeight,
                            letterSpacing: `${letterSpacing}px`
                        }}
                    >
                        {children}
                        
                    </div>
                </div>
            </div>
            <Sidebar 
                        onSummarize={handleSummarize} 
                        summary={summary} 
                        isSidebarOpen={isSidebarOpen} 
                        setSidebarOpen={setSidebarOpen} 
                    />
        </div>
    );
};

export default DocumentLayout;