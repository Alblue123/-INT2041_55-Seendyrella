"use client";

import React from 'react';
import { FontSize } from './tools/Fontsize';
import { FontFamily } from './tools//Fontfamily';
import { HighlightColor } from './tools/Highlight';
import { LetterSpacing } from './tools/Letterspacing';
import { LineSpacing } from './tools/Linespacing';
import { FontWeight } from './tools/Fontweight';

export default function TextFormattingToolbar() {
    return (
        <div className="flex justify-center items-center gap-2 p-2 border rounded-lg bg-white shadow-sm">
            {/* Font Weight */}
            <FontWeight />

            {/* Line Height */}
            <LineSpacing />
            
            {/* Letter Spacing */}
            <LetterSpacing />

            {/* Font Size */}
            <FontSize />

            {/* Font Family */}
            <FontFamily />

            {/* Highlight Color */}
            <HighlightColor />
        </div>
    );
};