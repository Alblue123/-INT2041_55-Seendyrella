"use client";

import React, {useState, useEffect} from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { FaBold } from 'react-icons/fa';
import { useFormatting } from '@/components/reading/formatting/UseFormatting';


export const NewFontWeight: React.FC = () => {
    const [isOnMode, setIsOnMode] = useState(false);
    const {setFontWeight} = useFormatting();



    const handleClick = () => {
        if (isOnMode) {
          setIsOnMode(false);
          console.log("bold function is off");
          setFontWeight('normal');
        } else {
          setIsOnMode(true);
          console.log("bold function is on");
          setFontWeight('bold');

        }
      };

    return (
        <>
      <Button
        variant="light"
        isIconOnly
        className={`min-w-[40px] ${isOnMode ? "bg-gray-200" : ""}`}
        onClick={handleClick}
      >
        <FaBold/>
      </Button>
      
      </>
    );
};