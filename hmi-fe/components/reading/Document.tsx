"use client";

import { FC, ReactNode, useRef, useState } from 'react';
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
        isHighlighting,
        lineHeight,
        letterSpacing
    } = useFormatting();

    const handleMouseUp = () => {
        if (contentRef.current) {
            const selection = window.getSelection();
            if (selection && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                const selectedContent = range.extractContents();

                // Create a span with highlight
                const highlightSpan = document.createElement('mark');
                highlightSpan.style.backgroundColor = isHighlighting ? highlightColor : 'transparent';
                highlightSpan.appendChild(selectedContent);

                // Replace the selected content with the highlighted span
                range.insertNode(highlightSpan);

                // Clear the selection
                selection.removeAllRanges();
            }
        }
    };

    // Improved function to remove highlight
    const removeHighlight = (e: React.MouseEvent) => {
        if (e.target instanceof HTMLElement && e.target.tagName === 'MARK') {
            const mark = e.target;
            const parent = mark.parentNode;

            if (parent) {
                // Create a document fragment to handle the mark's children
                const fragment = document.createDocumentFragment();

                // Move all children of the mark to the fragment
                while (mark.firstChild) {
                    fragment.appendChild(mark.firstChild);
                }

                // Replace the mark with its children (text nodes and other elements)
                parent.replaceChild(fragment, mark);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#E6E9F0]">
            <div className="max-w-7xl mx-auto px-4 py-8 h-full min-h-screen">
                <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-lg shadow-sm mx-auto p-8">
                    <div
                        ref={contentRef}
                        onMouseUp={handleMouseUp}
                        onClick={removeHighlight}
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
        </div>
    );
};

export default DocumentLayout;