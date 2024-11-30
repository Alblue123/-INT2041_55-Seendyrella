import * as PlayHT from 'playht';
import fs from 'fs';
import player from 'play-sound'; // For playing audio

const user_id = '31Ivv5ymNXOEmPxBSBzonXQr5PF2';
const secret_key = '761a57aab3c84b1f96d30125f2fdec86';

const audioPlayer = player(); // Initialize audio player

async function generateAndStreamAudio() {
    try {
        // Initialize client
        PlayHT.init({
            userId: user_id,
            apiKey: secret_key,
        });

        let input_text = "are you serious?";
        const filePath = './public/audio/hello-playht.mp3';
        const fileStream = fs.createWriteStream(filePath);

        const stream = await PlayHT.stream(input_text, {
            voiceEngine: "Play3.0-mini"
        });

        stream.pipe(fileStream);

        fileStream.on('finish', () => {
            console.log('Audio file has been generated successfully');
            
            // Play the audio file
            audioPlayer.play(filePath, (err) => {
                if (err) console.error('Error playing audio:', err);
            });
        });

        fileStream.on('error', (error) => {
            console.error('Error writing to file:', error);
        });

    } catch (error) {
        console.error('Error generating audio:', error);
    }
}

generateAndStreamAudio();
