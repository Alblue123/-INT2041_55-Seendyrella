"use client";

import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ChevronDown, AlignLeft, Save, Volume2, Share } from 'lucide-react';
import { FaBold } from 'react-icons/fa';

export default function TextFormattingToolbar() {
    const [fontSize, setFontSize] = React.useState("14");
    const [fontFamily, setFontFamily] = React.useState("Calibri (body)");
    const [formatting, setFormatting] = React.useState(new Set([]));
    const [alignment, setAlignment] = React.useState(new Set(["Left Align"]));

    const fontSizes = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"];
    const fontFamilies = ["Arial", "Calibri (body)", "Times New Roman", "Verdana", "Georgia"];
    const formattingOptions = ["Bold", "Italic", "Underline"];
    const alignmentOptions = ["Left Align", "Center", "Right Align"];

    // Handle font size change
    const handleFontSizeChange = (keys: any) => {
        const selectedSize = Array.from(keys)[0] as string;
        setFontSize(selectedSize);
    };

    // Handle font family change
    const handleFontFamilyChange = (keys: any) => {
        const selectedFont = Array.from(keys)[0] as string;
        setFontFamily(selectedFont);
    };

    // Handle formatting change
    const handleFormattingChange = (keys: any) => {
        setFormatting(keys);
    };

    // Handle alignment change
    const handleAlignmentChange = (keys: any) => {
        setAlignment(keys);
    };

    return (
        <div className="flex justify-center items-center gap-2 p-2 border rounded-lg bg-white shadow-sm">
            {/* Formatting Button */}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className="min-w-[40px]"
                        isIconOnly
                    >
                        <FaBold />
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Formatting options"
                    selectionMode="multiple"
                    selectedKeys={formatting}
                    onSelectionChange={handleFormattingChange}
                >
                    {formattingOptions.map((option) => (
                        <DropdownItem key={option}>{option}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {/* Paragraph Styles */}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className="min-w-[40px]"
                        isIconOnly
                    >
                        <AlignLeft className="h-4 w-4" />
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Paragraph styles"
                    selectionMode="single"
                    selectedKeys={alignment}
                    onSelectionChange={handleAlignmentChange}
                >
                    {alignmentOptions.map((option) => (
                        <DropdownItem key={option}>{option}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {/* Font Size */}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className="min-w-[60px]"
                    >
                        {fontSize}
                        <ChevronDown className="h-3 w-3" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Font sizes"
                    selectionMode="single"
                    selectedKeys={new Set([fontSize])}
                    onSelectionChange={handleFontSizeChange}
                >
                    {fontSizes.map((size) => (
                        <DropdownItem key={size}>{size}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {/* Font Family */}
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        className="min-w-[120px] justify-start"
                    >
                        {fontFamily}
                        <ChevronDown className="h-3 w-3 ml-auto" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Font families"
                    selectionMode="single"
                    selectedKeys={new Set([fontFamily])}
                    onSelectionChange={handleFontFamilyChange}
                >
                    {fontFamilies.map((font) => (
                        <DropdownItem key={font}>{font}</DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            {/* Save Button */}
            <Button
                variant="light"
                isIconOnly
                className="min-w-[40px]"
            >
                <Save className="h-4 w-4" />
            </Button>

            {/* Audio Button */}
            <Button
                variant="light"
                isIconOnly
                className="min-w-[40px]"
            >
                <Volume2 className="h-4 w-4" />
            </Button>

            {/* Share Button */}
            <Button
                variant="light"
                isIconOnly
                className="min-w-[40px]"
            >
                <Share className="h-4 w-4" />
            </Button>
        </div>
    );
};
