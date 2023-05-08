import styled, { keyframes } from "styled-components";
import Header from "./Header";

const Loading = () => {
  return (
    <>
      <Header />
      <div>
        <PacmanLoading>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </PacmanLoading>
        <div>Loading...</div>
      </div>
    </>
  );
};

export default Loading;

const PacmanTop = keyframes`
    0%,
    100% {
      transform: rotate(270deg);
    }
    50% {
      transform: rotate(360deg);
    }
`;

const PacmanBottom = keyframes`
    0%,
    100% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(0deg);
    }
`;

const Pellets = keyframes`
    0% {
      left: 200%;
      opacity: 0;
      transform: translateY(-50%);
    }
    5% {
      opacity: .5;
    }
    66% {
      opacity: 1;
    }
    67% {
      opacity: 0;
    }
    100% {
      left: 0;
      transform: translateY(-50%);
    }
`;

// const PacmanDisplay = styled.div`
//   box-sizing: border-box;
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #1919a6;
// `;

const PacmanLoading = styled.div`
  &,
  & > div {
    position: relative;
  }

  & {
    display: block;
    width: 32px;
    height: 32px;
    font-size: 0;
    color: #5a49f5;
  }

  & > div {
    display: inline-block;
    float: none;
    background-color: #696363;
    border: 0 solid #5a49f5;
  }

  & > div:nth-child(1),
  & > div:nth-child(2) {
    width: 0;
    height: 0;
    background: transparent;
    border-style: solid;
    border-width: 16px;
    border-right-color: transparent;
    border-radius: 100%;
    animation: ${PacmanTop} 0.5s 0s infinite;
  }

  & > div:nth-child(2) {
    margin-top: -32px;
    animation-name: ${PacmanBottom};
  }

  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5),
  & > div:nth-child(6) {
    position: absolute;
    top: 50%;
    left: 200%;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    opacity: 0;
    animation: ${Pellets} 2s 0s infinite linear;
  }

  & > div:nth-child(3) {
    animation-delay: -1.44s;
  }

  & > div:nth-child(4) {
    animation-delay: -1.94s;
  }

  & > div:nth-child(5) {
    animation-delay: -2.44s;
  }

  & > div:nth-child(6) {
    animation-delay: -2.94s;
  }
`;
