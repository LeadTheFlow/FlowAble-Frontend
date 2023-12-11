import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { json, useNavigate } from "react-router-dom";
import StyledButton from "../components/StyledButton";

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainPage = () => {
  const [data, setData] = useState({});
  const [appData, setAppData] = useState({});

  useEffect(() => {
    fetchDataTest();
    fetchAppTest();
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

  const params = {
    path: "../components/logo512.png",
  };

  const fetchDataTest = () => {
    axios
      .get("http://127.0.0.1:5000/api/OCR_result", params)
      .then((response) => {
        // 서버에서 받은 데이터를 사용
        console.log(response.data);
        const jsonData = response.data;
        setData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchAppTest = () => {
    axios
      .get("http://127.0.0.1:5000/api/app")
      .then((response) => {
        // 서버에서 받은 데이터를 사용
        console.log(response.data);
        const jsonData = response.data;
        setAppData(jsonData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const navigate = useNavigate();

  function moveToPage(moveTo) {
    navigate("/Pages/" + moveTo);
  }

  return (
    <MainContainer>
      <p>{data.message}</p>
      <StyledButton
        value="Calendar"
        onClick={() => moveToPage("Calendar/Selection")}
      >
        달력 기록
      </StyledButton>
      <StyledButton value="Product" onClick={() => moveToPage("Product")}>
        생리대 선택
      </StyledButton>
      <StyledButton value="Restroom" onClick={() => moveToPage("Restroom")}>
        화장실 환경
      </StyledButton>
    </MainContainer>
  );
};

export default MainPage;
