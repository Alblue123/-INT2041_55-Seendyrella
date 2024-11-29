"use client";

import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { Highlighter } from 'lucide-react';
import { useFormatting } from '../formatting/UseFormatting';

export const HighlightColor: React.FC = () => {
    const {
        isHighlighting,
        highlightColor,
        setHighlightColor,
        setIsHighlighting
    } = useFormatting();

    const highlightColors = [
        { name: "Yellow", value: "#FFFF00" },
        { name: "Green", value: "#90EE90" },
        { name: "Blue", value: "#ADD8E6" },
        { name: "Pink", value: "#FFB6C1" },
        { name: "Orange", value: "#FFA500" }
    ];

    const handleHighlightColorChange = (color: string) => {
        setHighlightColor(color);
        setIsHighlighting(true);
    };

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button
                    variant={isHighlighting ? "solid" : "light"}
                    isIconOnly
                    className="min-w-[40px]"
                >
                    <Highlighter
                        className="h-4 w-4"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="flex gap-2 p-2">
                    {highlightColors.map((color) => (
                        <button
                            key={color.name}
                            className="w-6 h-6 rounded-full"
                            style={{
                                backgroundColor: color.value,
                                border: highlightColor === color.value
                                    ? '2px solid black'
                                    : '1px solid gray'
                            }}
                            onClick={() => handleHighlightColorChange(color.value)}
                        />
                    ))}
                    <button
                        className="w-6 h-6 rounded-full bg-white border-2 border-gray-300"
                        onClick={() => {
                            setIsHighlighting(false);
                            setHighlightColor("transparent");
                        }}
                    >
                        ✕
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};