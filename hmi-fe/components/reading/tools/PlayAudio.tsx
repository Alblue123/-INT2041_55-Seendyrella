"use client";

import React from 'react';
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useFormatting } from '../formatting/UseFormatting';

export const PlayAudio: React.FC = () => {
    // const { selectedText } = useFormatting();
    // console.log(selectedText);
    return (
     <>
         <Button
           variant="light"
           size="sm"
           isIconOnly className="min-w-[40px]">

            <HiMiniSpeakerWave />
         </Button>
     </>
    )
 };