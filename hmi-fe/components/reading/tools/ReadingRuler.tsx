"use client";

import React from 'react';
import {
    Switch,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent
} from "@nextui-org/react";
import { useFormatting } from '../formatting/UseFormatting';
import { RulerIcon, Settings } from 'lucide-react';

export const ReadingRuler: React.FC = () => {
    const {
        readingRuler,
        setReadingRuler,
        rulerHeight,
        setRulerHeight,
        rulerColor,
        setRulerColor
    } = useFormatting();

    return (
        <Popover placement="bottom-end">
            <PopoverTrigger>
                <div className="flex items-center">
                    <Switch
                        isSelected={readingRuler}
                        onValueChange={setReadingRuler}
                        size="sm"
                        color="primary"
                        startContent={<RulerIcon className="w-4 h-4" />}
                    />
                    {readingRuler && <Settings className="w-4 h-4 text-gray-500 cursor-pointer" />}
                </div>
            </PopoverTrigger>
            {readingRuler && (
                <PopoverContent>
                    <div className="pr-4 py-3 space-y-3 w-64">
                        <div className="flex items-center justify-between">
                            <label className="text-sm">Chiều cao:</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={rulerHeight}
                                    onChange={(e) => setRulerHeight(Number(e.target.value))}
                                    className="w-24"
                                />
                                <span className="text-sm w-8 text-right">{rulerHeight}rem</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm">Màu:</label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="color"
                                    value={rulerColor}
                                    onChange={(e) => setRulerColor(e.target.value)}
                                    className="w-8 h-8 p-0 border-none"
                                />
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
};