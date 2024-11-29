"use client";

import React from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { FaTextHeight } from 'react-icons/fa';
import { useFormatting } from '../formatting/UseFormatting';

export const LineSpacing: React.FC = () => {
    const { lineHeight, setLineHeight } = useFormatting();

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button variant="light" isIconOnly className="min-w-[40px]">
                    <FaTextHeight />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex items-center gap-2 p-2">
                    <label>Line Height:</label>
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={lineHeight}
                        onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                        className="w-32"
                    />
                    <span>{lineHeight.toFixed(1)}</span>
                </div>
            </PopoverContent>
        </Popover>
    );
};