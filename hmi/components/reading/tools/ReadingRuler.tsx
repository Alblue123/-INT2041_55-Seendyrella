"use client";

import React from 'react';
import {
    Switch,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Slider
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
        setRulerColor,
        rulerPosition,
        setRulerPosition
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
                    <div className="p-4 space-y-4 w-64">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm">Ruler Height</label>
                            <Slider
                                size="sm"
                                step={0.5}
                                minValue={1}
                                maxValue={10}
                                value={rulerHeight}
                                onChange={(value) => setRulerHeight(value as number)}
                                label={`${rulerHeight} rem`}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm">Ruler Position</label>
                            <Slider
                                size="sm"
                                step={1}
                                minValue={0}
                                maxValue={100}
                                value={rulerPosition}
                                onChange={(value) => setRulerPosition(value as number)}
                                label={`${rulerPosition}%`}
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label className="text-sm">Ruler Color</label>
                            <input
                                type="color"
                                value={rulerColor}
                                onChange={(e) => setRulerColor(e.target.value)}
                                className="w-full h-10 p-0 border-none"
                            />
                        </div>
                    </div>
                </PopoverContent>
            )}
        </Popover>
    );
};