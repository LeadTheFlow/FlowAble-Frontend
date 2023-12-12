import React, { useState, useRef, useCallback } from 'react';

import Webcam from 'react-webcam';

//npm i react-webcam
// webcam test version
const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    localStorage.setItem('capturedImage', imageSrc);

    const savedImage = localStorage.getItem('capturedImage');
    if (savedImage) {
      console.log(savedImage);
    }
  }, [webcamRef]);

  const videoConstraints = {
    aspectRatio: 0.6666666667,
    facingMode: 'user',
    width: { min: 480 },
    height: { min: 720 },
  };

  return (
    <div className="Container">
      {img == null ? (
        <>
          <Webcam
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            audio={false}
            height={500}
            width={500}
            ref={webcamRef}
            mirrored={false}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Recapture</button>
        </>
      )}
    </div>
  );
};

export default WebcamComponent;
