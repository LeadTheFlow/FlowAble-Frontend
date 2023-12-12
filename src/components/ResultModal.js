import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ModalButton from './ModalButton';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
`;

const ResultTitle = styled.div`
  font-size: 1.5rem;
  padding: 10px;
`;

const ResultModal = ({ data, closeModal, cameraType }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let synthesizer;

    // TTS 실행
    try {
      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        '614a864f8782482a813b09414bfd8985',
        'koreacentral'
      );
      speechConfig.speechSynthesisVoiceName = 'ko-KR-SunHiNeural';
      synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

      let text = '';
      if (cameraType === 'ColorDetection') {
        text = `진단 결과. ${data.message}`;
      } else if (cameraType === 'ProductOCR') {
        if (data.brand === '') {
          text = `제품을 인식하지 못했습니다.`;
        } else {
          text = `이 제품은 ${data.brand}, 사이즈는 ${data.size}입니다.`;
        }
      } else if (cameraType === 'TrashcanDetection') {
        text = `화면의 ${data.position}에 수거함이 있습니다.`;
      }

      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result) {
            console.log('Speech synthesis succeeded.');
          }
        },
        (error) => {
          console.error('Error synthesizing speech:', error);
        }
      );
    } catch (error) {
      console.error('Error initializing SpeechSynthesizer:', error);
    }

    return () => {
      if (synthesizer && !synthesizer.isDisposed) {
        synthesizer.close();
      }
    };
  }, [data, cameraType]);

  return (
    <ModalBackground>
      <ModalContainer>
        {cameraType === 'ColorDetection' && (
          <div>
            <ResultTitle>
              진단 결과: <br />
              {data.message}
            </ResultTitle>
            {/* <ModalButton
              value="Calendar"
              onClick={() => moveToPage('Calendar')}
            >
              달력 기록
            </ModalButton> */}
            <ModalButton value="Calendar" onClick={closeModal}>
              다시 찍기
            </ModalButton>
          </div>
        )}

        {cameraType === 'ProductOCR' && (
          <div>
            {data.brand !== '' ? (
              <ResultTitle>
                이 제품은 {data.brand}, <br />
                사이즈는 {data.size} 입니다
              </ResultTitle>
            ) : (
              <ResultTitle>
                제품을 인식하지 <br /> 못했습니다
              </ResultTitle>
            )}
            <ModalButton value="Product" onClick={closeModal}>
              다시 찍기
            </ModalButton>
          </div>
        )}

        {cameraType === 'TrashcanDetection' && (
          <div>
            <ResultTitle>
              화면의 {data.position}에 수거함이 있습니다
            </ResultTitle>
            <ModalButton value="Restroom" onClick={closeModal}>
              다시 찍기
            </ModalButton>
          </div>
        )}
      </ModalContainer>
    </ModalBackground>
  );
};

export default ResultModal;
