"use client";

import React, { useState, useEffect } from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useFormatting } from '../formatting/UseFormatting';

export const PlayAudio: React.FC = () => {
    const [isOnMode, setIsOnMode] = useState(false);
    useEffect(() => {
        document.addEventListener('mouseup', handleAudio);
        return () => {
            document.removeEventListener('mouseup', handleAudio);
        };
    }, [isOnMode]);
    const handleClick = () => {
        if (isOnMode)  {
            setIsOnMode(false);
            console.log("Audio function is off");
        } else {
            setIsOnMode(true);
            console.log("Audio function is on");
        }
    };

const handleAudio = async () => {
    if (isOnMode) {
        const selection = window.getSelection();
        if (selection && selection.toString()) {
            const text = selection.toString();
            console.log("Selected text:", text);
            /// help me to call stream this text using PlayHT stream 
        }
    }
}
    return (
        <>
            <Button
                variant="light"
                isIconOnly 
                className={`min-w-[40px] ${isOnMode ? 'bg-gray-200' : ''}`}
                onClick={handleClick}>
                <HiMiniSpeakerWave />
            </Button>
            <div>
                
            </div>
        </>
    );
};