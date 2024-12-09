"use client";

import React from 'react';
import { Switch, Tooltip } from "@nextui-org/react";
import { useFormatting } from "../formatting/UseFormatting";
import { LayoutTemplate } from 'lucide-react';

export const ReadingMask: React.FC = () => {
    const { readingMask, setReadingMask } = useFormatting();

    return (
        <Tooltip
            content="Reading mask"
            placement='bottom'
        >
            <div className="flex items-center space-x-2">
                <Switch
                    isSelected={readingMask}
                    onValueChange={setReadingMask}
                    size="1g"
                    color="primary"
                    startContent={<LayoutTemplate className="w-4 h-4" />}
                />
            </div>
        </Tooltip>
    );
};