"use client";

import { FC, ReactNode, useRef, useState } from 'react';
import { useFormatting } from './formatting/UseFormatting';
import Sidebar from './tools/summarize'
interface DocumentLayoutProps {
    children?: React.ReactNode;
}

const DocumentLayout: React.FC<DocumentLayoutProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [mouseY, setMouseY] = useState(0);
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
             const response = await fetch('https://08a1-34-124-236-166.ngrok-free.app', {
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
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (contentRef.current) {
            const rect = contentRef.current.getBoundingClientRect();
            setMouseY(e.clientY - rect.top);
        }
    };
    const {
        fontSize,
        fontFamily,
        fontWeight,
        fontStyle,
        textDecoration,
        lineHeight,
        letterSpacing,
        backgroundColor,
        readingRuler,
        rulerHeight,
        rulerColor,
        rulerPosition,
        readingMask
    } = useFormatting();

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor }}
            onMouseMove={handleMouseMove}
        >
                        <div className={`max-w-7xl mx-auto px-4 py-8 h-full min-h-screen transition-all ${isSidebarOpen ? 'mr-80' : ''}`}>
              <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8">
                    
            <div className="max-w-7xl mx-auto px-4 py-8 h-full min-h-screen">
                <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8 relative overflow-hidden">
                    {readingRuler && (
                        <div
                            className="absolute left-0 right-0 pointer-events-none z-50"
                            style={{
                                top: `${rulerPosition}%`,
                                height: `${rulerHeight}rem`,
                                backgroundColor: rulerColor,
                                opacity: 0.3,
                                transform: 'translateY(-50%)',
                                borderRadius: '4px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                        />
                    )}

                    {readingMask && contentRef.current && (
                        <div>
                            <div
                                className="absolute left-0 right-0 bg-black/60 pointer-events-none z-50"
                                style={{
                                    top: 0,
                                    height: `${mouseY}px`,
                                    width: '100%'
                                }}
                            />
                            <div
                                className="absolute left-0 right-0 bg-black/60 pointer-events-none z-50"
                                style={{
                                    top: `calc(${mouseY}px + 120px)`,
                                    bottom: 0,
                                    width: '100%'
                                }}
                            />
                        </div>
                    )}
                    <div
                        ref={contentRef}
                        className={`
                            py-8
                            max-w-5xl 
                            mx-auto 
                            overflow-auto
                            relative z-30
                            ${fontWeight === 'bold' ? 'bold' : ''}
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
        </div>
        </div>
    );
};

export default DocumentLayout;