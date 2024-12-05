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
        const user_id = '31Ivv5ymNXOEmPxBSBzonXQr5PF2';
        const secret_key = '761a57aab3c84b1f96d30125f2fdec86';
        const url ='https://api.play.ht/api/v2/tts/stream'; 
        const options = {
          method: "POST",
          headers: {
            accept: "audio/mpeg",
            "content-type": "application/json",
            "X-USER-ID": user_id,
            AUTHORIZATION: secret_key,
          },
          body: JSON.stringify({
            voice_engine: "Play3.0-mini",
            text: text,
            output_format: "mp3",
            sample_rate: "44100",
            speed: 1,
          }),
        };

        const response = await fetch(url, options);
        const readableStream = response.body;
        console.log("Response:", response.body);
        // Pipe the readable stream to a writable stream, this can be a local file or any other writable stream
        // readableStream.pipe(fs.createWriteStream("./audio.mp3"));
        
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
