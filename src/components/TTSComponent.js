// TTSComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

// 5002/api/OCR
// Test version
const TTSComponent = ({ endpoint }) => {
  const [textToSpeak, setTextToSpeak] = useState('');

  const fetchOCRData = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);

    axios
      .post('http://127.0.0.1:5002/api/OCR', formData)
      .then((response) => {
        console.log(response.data.brand);
        const TTSText =
          '촬영하신 제품은' +
          response.data.brand +
          ', 사이즈는' +
          response.data.size +
          '입니다.';
        setTextToSpeak(TTSText);
      })
      .catch((error) => {
        console.error('Error uploading image', error);
      });
  };

  const speakText = (text) => {
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      '614a864f8782482a813b09414bfd8985',
      'koreacentral'
    );
    speechConfig.speechSynthesisVoiceName = 'ko-KR-SunHiNeural';
    const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result) {
          console.log('Speech synthesis succeeded.');
        }
        synthesizer.close();
      },
      (error) => {
        console.error('Error synthesizing speech:', error);
        synthesizer.close();
      }
    );
  };

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    fetchOCRData(imageFile);
  };

  // OCR 결과를 기반으로 TTS 실행
  const handleSpeak = () => {
    if (textToSpeak) {
      speakText(textToSpeak);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleSpeak}>Speak OCR Text</button>
    </div>
  );
};

export default TTSComponent;
