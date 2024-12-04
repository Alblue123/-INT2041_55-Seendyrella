"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { Eraser as EraserIcon } from "lucide-react";
import { useFormatting } from '../formatting/UseFormatting';

export const Eraser: React.FC = () => {
    const { setHighlight, removeHighlight } = useFormatting();
    const [isErasing, setIsErasing] = useState(false);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (isErasing) {
                const target = e.target as HTMLElement;
                const highlightedElement = target.closest('span[highlight="true"]') as HTMLElement;
                
                if (highlightedElement) {
                    // Store the text content
                    const originalText = highlightedElement.textContent;
                    
                    // Remove the highlight span and replace with original text
                    if (originalText && highlightedElement.parentNode) {
                        // Create text node with original content
                        const textNode = document.createTextNode(originalText);
                        // Replace highlighted element with text node
                        highlightedElement.parentNode.replaceChild(textNode, highlightedElement);
                    }
                }
            }
        };
    
        if (isErasing) {
            document.addEventListener('click', handleClick);
        }
    
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [isErasing]);

    const handleErase = () => {
        setIsErasing(isErasing===false);
        if (!isErasing) {
            document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l11.19-11.4c.79-.78 2.05-.78 2.84 0zM4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53-4.95-4.95-4.95 4.95z"/></svg>'), auto`;
        }else {
            document.body.style.cursor = 'default';
        }

        
    };

    return (
        <Button
            isIconOnly
            className={`min-w-[40px] ${isErasing ? 'bg-gray-200' : ''}`}
            onClick={handleErase}
            variant="light"
        >
            <EraserIcon className="h-4 w-4"/>
        </Button>
    );
};