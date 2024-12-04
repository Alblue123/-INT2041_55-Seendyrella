"use client";

import React, { useRef } from 'react';
import { useFormatting } from './formatting/UseFormatting';

interface DocumentLayoutProps {
    children?: React.ReactNode;
}

const DocumentLayout: React.FC<DocumentLayoutProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);

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
        rulerPosition
    } = useFormatting();

    return (
        <div
            className="min-h-screen"
            style={{ backgroundColor }}
        >
            <div className="max-w-7xl mx-auto px-4 py-8 h-full min-h-screen">
                <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8 relative overflow-hidden">
                    {readingRuler && contentRef.current && (
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