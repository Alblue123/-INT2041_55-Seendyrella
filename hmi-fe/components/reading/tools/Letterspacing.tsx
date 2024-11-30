"use client";

import React from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FaTextWidth } from 'react-icons/fa';
import { useFormatting } from '../formatting/UseFormatting';

export const LetterSpacing: React.FC = () => {
    const { letterSpacing, setLetterSpacing } = useFormatting();

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button variant="light" isIconOnly className="min-w-[40px]">
                    <FaTextWidth />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex items-center gap-2 p-2">
                    <label>Letter Spacing:</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={letterSpacing}
                        onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                        className="w-32"
                    />
                    <span>{letterSpacing.toFixed(1)}</span>
                </div>
            </PopoverContent>
        </Popover>
    );
};