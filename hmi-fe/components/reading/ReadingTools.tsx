"use client";

import React from 'react';
import { FontSize } from './tools/Fontsize';
import { FontFamily } from './tools//Fontfamily';
import { HighlightColor } from './tools/Highlight';
import { LetterSpacing } from './tools/Letterspacing';
import { LineSpacing } from './tools/Linespacing';
import { FontWeight } from './tools/Fontweight';
import {PlayAudio} from './tools/PlayAudio';
import {Eraser} from './tools/Eraser';
import {Sidebar} from './tools/summarize'
export default function TextFormattingToolbar() {
    return (
        <div className="fixed top-1 left-0 w-full flex justify-center items-center gap-2 p-2 border rounded-lg bg-white shadow-sm pt-20 ">
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
            
            {/* Play Audio */}
            <PlayAudio />

            <Eraser /> 
            
        </div>
    );
};