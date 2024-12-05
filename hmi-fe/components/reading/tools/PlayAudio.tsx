"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { useFormatting } from "../formatting/UseFormatting";

export const PlayAudio: React.FC = () => {
  const [isOnMode, setIsOnMode] = useState(false);
  useEffect(() => {
    document.addEventListener("mouseup", handleAudio);
    return () => {
      document.removeEventListener("mouseup", handleAudio);
    };
  }, [isOnMode]);
  const handleClick = () => {
    if (isOnMode) {
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
        const user_id = 'yRyXEC1EG2bK6XxzQuw3SgHmfHz2';
        const secret_key = '322c3ca0457e4cbb9d0f992d64bcbe3c';
        const url ='https://api.play.ht/api/v2/tts/stream'; 

        const options = {
          method: "POST",
          headers: {
            'accept': "audio/mpeg",
            "content-type": "application/json",
            "X-USER-ID": user_id,
            'AUTHORIZATION': secret_key,
          },
          body: JSON.stringify({
            "text": text,
            "voice": "s3://voice-cloning-zero-shot/775ae416-49bb-4fb6-bd45-740f205d20a1/jennifersaad/manifest.json",
            "output_format": "mp3",
            "temperature": 0.7
          }),
        };

        const response = await fetch(url, options);
        const arrayBuffer = await response.arrayBuffer();
        
        // Create audio context
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Decode audio data
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Create audio source
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        console.log("Audio source:", source);
        // Play the audio
        source.start(0);
        
      }
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
        <HiMiniSpeakerWave />
      </Button>
      <div></div>
    </>
  );
};
