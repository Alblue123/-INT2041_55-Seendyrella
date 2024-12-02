"use client"

import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Button } from "@nextui-org/button";
import { useFormatting } from '../formatting/UseFormatting';

const BACKGROUND_COLORS = [
    { name: 'Default', value: '#E6E9F0' },
    { name: 'Light Blue', value: '#dfe7fd' },
    { name: 'Light Peach', value: '#ffe8d6' },
    { name: 'Light Green', value: '#e8f5e9' },
    { name: 'Dark navy', value: '#0a2239' },
    { name: 'Charcoal Grey', value: '#2c2f33' },
    { name: 'Dark green', value: '#1b4332' },
];

export const BackgroundColor: React.FC = () => {
    const { backgroundColor, setBackgroundColor } = useFormatting();

    // Find the current color object
    const currentColor = BACKGROUND_COLORS.find(color => color.value === backgroundColor) || BACKGROUND_COLORS[0];

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button
                    variant="light"
                    className="w-fit"
                >
                    <div
                        className="w-4 h-4 mr-2 rounded-full border"
                        style={{ backgroundColor: currentColor.value }}
                    />
                    {currentColor.name}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Listbox
                    aria-label="Background Color Selection"
                    onAction={(key) => {
                        const selectedColor = BACKGROUND_COLORS.find(color => color.value === key);
                        if (selectedColor) {
                            setBackgroundColor(selectedColor.value);
                        }
                    }}
                >
                    {BACKGROUND_COLORS.map((color) => (
                        <ListboxItem
                            key={color.value}
                            startContent={
                                <div
                                    className="w-4 h-4 rounded-full border"
                                    style={{ backgroundColor: color.value }}
                                />
                            }
                        >
                            {color.name}
                        </ListboxItem>
                    ))}
                </Listbox>
            </PopoverContent>
        </Popover>
    );
};