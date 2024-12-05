import * as PlayHT from 'playht';
import fs from 'fs';


export const generateAndStreamAudio = async (input_text: string) => {
    try {
        const user_id = '31Ivv5ymNXOEmPxBSBzonXQr5PF2';
        const secret_key = '761a57aab3c84b1f96d30125f2fdec86';

        
        PlayHT.init({
            userId: user_id,
            apiKey: secret_key,
        });

        // let input_text = "Yes, integrating React with Django Admin is viable";
        // const filePath = "D:\\Downloads\\Kì này\\HMI\\-INT2041_55-Seendyrella\\hmi-fe\\public\\audio\\hello-playht.mp3";
        const path = require("path");
        const filePath = path.join(__dirname, "audio.mp3");
        const fileStream = fs.createWriteStream(filePath);

        const stream = await PlayHT.stream(input_text, {
            voiceEngine: "Play3.0-mini",
            speed: 0.8,
        });

        stream.pipe(fileStream);

        fileStream.on('finish', async () => {
            console.log('Audio file has been generated successfully');
            const sound = require('sound-play');
            sound.play(filePath);
        });

        fileStream.on('error', (error) => {
            console.error('Error writing to file:', error);
        });

    } catch (error) {
        console.error('Error generating audio:', error);
    }
}
const input_text = "Yes, integrating React with Django Admin is viable";
generateAndStreamAudio(input_text);