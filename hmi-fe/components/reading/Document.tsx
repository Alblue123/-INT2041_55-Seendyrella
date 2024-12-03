"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useFormatting } from './formatting/UseFormatting';

interface DocumentLayoutProps {
    children?: React.ReactNode;
}

const DocumentLayout: React.FC<DocumentLayoutProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [mouseY, setMouseY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

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
        readingMask
    } = useFormatting();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (contentRef.current) {
            const rect = contentRef.current.getBoundingClientRect();
            setMouseY(e.clientY - rect.top);
        }
    };

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-7xl mx-auto px-4 py-8 h-full min-h-screen">
                <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8 relative overflow-hidden">
                    {readingRuler && isHovered && (
                        <div
                            className="absolute left-0 right-0 pointer-events-none"
                            style={{
                                top: `${mouseY}px`,
                                height: `${rulerHeight}rem`, // To hơn
                                backgroundColor: rulerColor,
                                opacity: 0.3, // Fade
                                transform: 'translateY(px)',
                                borderRadius: '4px', // Bo tròn góc
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Hiệu ứng nổi
                            }}
                        />
                    )}


                    {readingMask && contentRef.current && (
                        <div className=''>
                            <div
                                className="absolute left-0 right-0 bg-black/60 pointer-events-none"
                                style={{
                                    top: 0,
                                    height: `${mouseY}px`,
                                    width: '100%'
                                }}
                            />
                            <div
                                className="absolute left-0 right-0 bg-black/60 pointer-events-none"
                                style={{
                                    top: `calc(${mouseY}px + 110px)`,
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
                            ${fontWeight === 'bold' ? 'font-bold' : 'font-normal'}
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
        </div>
    );
};

export default DocumentLayout;