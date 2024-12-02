"use client";

import React from 'react';
import { Switch, Tooltip } from "@nextui-org/react";
import { useFormatting } from '../formatting/UseFormatting';
import { RulerIcon } from 'lucide-react';

export const ReadingRuler: React.FC = () => {
    const { readingRuler, setReadingRuler } = useFormatting();

    return (
        <Tooltip
            content="Reading ruler"
            placement='bottom'
        >
            <div className="flex items-center space-x-2">
                <Switch
                    isSelected={readingRuler}
                    onValueChange={setReadingRuler}
                    size="sm"
                    color="primary"
                    startContent={<RulerIcon className="w-4 h-4" />}
                />
            </div>
        </Tooltip>
    );
};