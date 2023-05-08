import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavMenu = ({ modalHandler }) => {
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (e) => {
    if (!modalRef.current.contains(e.target)) {
      modalHandler();
    }
  };

  return (
    <MenuContainer>
      <Menu ref={modalRef}>
        <h3 onClick={() => navigate("/")}>투두리스트</h3>
        <h3 onClick={() => navigate("/history")}>히스토리</h3>
        <h3 onClick={() => navigate("/calendar")}>캘린더</h3>
        <h3 onClick={() => navigate("/about")}>About</h3>
        <h3 onClick={() => navigate("/loading")}>Loading</h3>
      </Menu>
    </MenuContainer>
  );
};

export default NavMenu;

const MenuContainer = styled.div`
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const Menu = styled.div`
  position: fixed;
  right: 25%;
  max-width: 214px;
  width: 50%;
  float: right;
  height: 84.5vh;
  border-bottom-right-radius: 10px;
  top: calc(0vh + 70px);
  background-color: #fede29;
  text-align: center;
  color: #535353;
  transition: all 0.3s;
  z-index: 999;
  margin-top: -1px;

  & h3 {
    margin: 30px auto;

    &:hover {
      cursor: pointer;
      font-weight: bold;
      background-color: #bea0e6;
    }
  }
`;
