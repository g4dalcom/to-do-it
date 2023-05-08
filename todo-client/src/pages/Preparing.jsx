import Header from "../components/Header";
import preparing from "../assets/preparing.jpg";
import styled from "styled-components";

const Preparing = () => {
  return (
    <>
      <Header />
      <PreAlert>COMMING SOON!</PreAlert>
      <PreText>페이지가 준비중입니다!</PreText>
      <PreImg src={preparing} />
    </>
  );
};

export default Preparing;

const PreAlert = styled.div`
  text-decoration: underline;
  text-underline-offset: 10px;
  font-size: 40px;
  padding-bottom: 20px;
`;

const PreText = styled.div`
  position: absolute;
  width: 30%;
  font-size: 50px;
  transform: translate(-5%, -30%);
`;

const PreImg = styled.img`
  width: 80%;
  height: 40%;
  margin-bottom: 140px;
`;
