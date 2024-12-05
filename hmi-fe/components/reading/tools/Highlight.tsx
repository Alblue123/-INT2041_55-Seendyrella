"use client";

import React, {useState} from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { Highlighter } from 'lucide-react';
import { useFormatting } from '@/components/reading/formatting/UseFormatting';


export const HighlightColor: React.FC = () => {
    const { setHighlight } = useFormatting();
    const [highlighterColor, setHighlighterColor] = useState<string>('transparent');

    const highlightColors = [
        { name: "Yellow", value: "#FFFF00" },
        { name: "Green", value: "#90EE90" },
        { name: "Blue", value: "#ADD8E6" },
        { name: "Pink", value: "#FFB6C1" },
        { name: "Orange", value: "#FFA500" }
    ];
    return (
        <Popover placement="bottom">
            <PopoverTrigger
             style={{ backgroundColor: highlighterColor }}>
                <Button
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
                            className="w-6 h-6 rounded-full hover:w-8 hover:h-8 active:w-6 active:h-6 transition-all duration-200"
                            style={{
                                backgroundColor: color.value,
                            }}
                            
                            onClick={() => {

                                setHighlight(color.value),
                                console.log(color.value)
                                setHighlighterColor(color.value);

                            }}
                        />
                    ))}
                    {/* // x button to close the popover */}
                    <button
                        className="w-6 h-6 rounded-full bg-white border-2 border-gray-300"
                        onClick={() => {
                            setHighlight('transparent');
                            setHighlighterColor('transparent');

                        }}
                    >
                        ✕
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
};