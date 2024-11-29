"use client";

import { FC, ReactNode, useRef } from 'react';
import { useFormatting } from './formatting/UseFormatting';

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
        highlightColor,
        isHighlighting
    } = useFormatting();

    return (
        <div className="min-h-screen bg-[#E6E9F0]">
            <div className="max-w-7xl mx-auto px-4 py-8 h-full min-h-screen">
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
                            backgroundColor: isHighlighting ? highlightColor : 'transparent'
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