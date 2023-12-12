import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { json, useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import FileUploader from '../components/FileUploader';
import TTSComponent from '../components/TTSComponent';
import FlowAbleLogo from '../assets/FlowAbleLogo.png';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  max-width: 100px;
`;

const MainPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchDataTest();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/api/data");
  //     const jsonData = await response.json();
  //     setData(jsonData);
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  //   # API 엔드포인트에 GET 요청을 보냄
  // response = requests.get(url, params={'path': image_path})

  const fetchDataTest = () => {
    axios
      .get('http://127.0.0.1:5000/api/data')
      .then((response) => {
        // 서버에서 받은 데이터를 사용
        const jsonData = response.data;
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const navigate = useNavigate();

  function moveToPage(moveTo) {
    navigate('/Pages/' + moveTo);
  }

  const moveToCameraPage = (moveTo, cameraType) => {
    navigate(`/Pages/${moveTo}`, { state: { cameraType } });
  };

  // const handleUploadResult = (result) => {
  //   console.log(result);
  //   setData(result);
  // };

  return (
    <MainContainer>
      {/* <p>{data.message}</p> */}
      {/* <FileUploader onUpload={handleUploadResult}></FileUploader> */}
      {/* <TTSComponent endpoint={'5002/api/OCR'}></TTSComponent> */}
      <LogoImg src={FlowAbleLogo} />
      <StyledButton
        value="Calendar"
        onClick={() => moveToPage('Calendar/Selection')}
      >
        달력 기록
      </StyledButton>
      <StyledButton
        value="Product"
        onClick={() => moveToCameraPage('Camera', 'ProductOCR')}
      >
        생리대 선택
      </StyledButton>
      <StyledButton
        value="Restroom"
        onClick={() => moveToCameraPage('Camera', 'TrashcanDetection')}
      >
        화장실 환경
      </StyledButton>
    </MainContainer>
  );
};

export default MainPage;
