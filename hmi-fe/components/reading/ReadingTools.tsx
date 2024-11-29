"use client";

import React from 'react';
import { Button } from "@nextui-org/react";
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { useFormatting } from './formatting/UseFormatting';
import { FontSize } from './tools/Fontsize';
import { FontFamily } from './tools//Fontfamily';
import { HighlightColor } from './tools/Highlight';

export default function TextFormattingToolbar() {
    const {
        fontSize,
        fontWeight,
        fontStyle,
        textDecoration,
        setFontWeight,
        setFontStyle,
        setTextDecoration,
    } = useFormatting();

    const toggleFormatting = (type: 'bold' | 'italic' | 'underline') => {
        
        switch (type) {
            case 'bold':
                setFontWeight(fontWeight === 'normal' ? 'bold' : 'normal');
                break;
            case 'italic':
                setFontStyle(fontStyle === 'normal' ? 'italic' : 'normal');
                break;
            case 'underline':
                setTextDecoration(textDecoration === 'none' ? 'underline' : 'none');
                break;
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 p-2 border rounded-lg bg-white shadow-sm">
            {/* Formatting Buttons */}
            <Button
                variant={fontWeight === 'bold' ? "solid" : "light"}
                isIconOnly
                className="min-w-[40px]"
                onClick={() => toggleFormatting('bold')}
            >
                <FaBold />
            </Button>

            <Button
                variant={fontStyle === 'italic' ? "solid" : "light"}
                isIconOnly
                className="min-w-[40px]"
                onClick={() => toggleFormatting('italic')}
            >
                <FaItalic />
            </Button>

            <Button
                variant={textDecoration === 'underline' ? "solid" : "light"}
                isIconOnly
                className="min-w-[40px]"
                onClick={() => toggleFormatting('underline')}
            >
                <FaUnderline />
            </Button>
            
            {/* Font Size */}
            <FontSize />

            {/* Font Family */}
            <FontFamily />

            {/* Highlight Color */}
            <HighlightColor />

        </div>
    );
}