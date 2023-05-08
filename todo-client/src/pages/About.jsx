import Header from "../components/Header";
import profile from "../assets/profile.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Header />
      <AboutContainer>
        <AboutImg src={profile} />
      </AboutContainer>
      <InfoContainer>
        <div style={{ fontSize: "50px" }}>About me!</div>
        <Link
          to="https://github.com/g4dalcom"
          target="_blank"
          style={{ textAlign: "center" }}
        >
          깃허브
        </Link>
        <Link
          to="https://g4daclom.tistory.com/"
          target="_blank"
          style={{ textAlign: "center" }}
        >
          블로그
        </Link>
      </InfoContainer>
    </>
  );
};

export default About;

const AboutContainer = styled.div`
  border-radius: 100%;
  width: 200px;
  height: 200px;
  position: relative;
  margin: 60px 30px 30px 20px;
  margin-top: 60px;
  padding: 40px;
  box-shadow: 5px 9px 25px 0px rgb(0 0 0 / 12%);
  background-color: #f3e27f;

  &:hover {
    background-color: #bea0e6;
    cursor: pointer;
  }
`;

const AboutImg = styled.img`
  border-radius: 100%;
  width: 270px;
  height: 270px;
  position: absolute;
  top: -20px;
  left: 5px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
`;
