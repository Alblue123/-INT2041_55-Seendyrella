"use client";

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ChevronDown } from 'lucide-react';
import { useFormatting } from '../formatting/UseFormatting';

export const FontSize: React.FC = () => {
    const { fontSize, setFontSize } = useFormatting();

    const fontSizes = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];

    const handleFontSizeChange = (keys: any) => {
        const selectedSize = Array.from(keys)[0] as string;
        // Always update, even if the same size is selected
        setFontSize(selectedSize);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="light"
                    className="min-w-[60px]"
                >
                    {fontSize || fontSizes[0]}
                    <ChevronDown className="h-3 w-3" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Font sizes"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={new Set([fontSize])}
                onSelectionChange={handleFontSizeChange}
            >
                {fontSizes.map((size) => (
                    <DropdownItem key={size}>{size}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};