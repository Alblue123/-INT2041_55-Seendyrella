"use client";

import React from 'react';
import { Button } from "@nextui-org/react";
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { useFormatting } from '../formatting/UseFormatting';

export const FontWeight: React.FC = () => {
    const {
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
        <>
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
        </>
    );
};