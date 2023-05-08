import { useState } from "react";
import styled from "styled-components";
import favicon from "../assets/favicon.png";
import burger from "../assets/hamburger.png";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import Modal from "./Modal";

const Header = () => {
  const [modal, setModal] = useState(false);

  // 햄버거 메뉴 모달
  const modalHandler = () => {
    setModal(!modal);
  };

  return (
    <>
      <StHeader>
        <Top>
          <Logo>
            <Link to="/">
              <img alt="" src={favicon} />
              <div>TO-DO-IT</div>
            </Link>
          </Logo>
          <MenuBar>
            <img alt="hamburger icon" src={burger} onClick={modalHandler} />
          </MenuBar>
        </Top>
        {modal && (
          <Modal>
            <NavMenu modalHandler={modalHandler} />
          </Modal>
        )}
      </StHeader>
    </>
  );
};

export default Header;

const StHeader = styled.div`
  width: 50vw;
  margin: 0 auto;
  z-index: 3;
  position: fixed;
  top: 5px;

  & a {
    text-decoration: none;
    font-weight: 600;
    font-size: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 70px;

    &:hover {
      cursor: pointer;
    }

    &:visited {
      color: #4b4c4c;
    }

    & img {
      width: 32px;
      height: 32px;
      margin: auto 10px;
    }

    & div {
      padding-top: 6px;
    }
  }
`;

const Top = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  position: relative;
  background-color: #fede29;
  border-radius: 10px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const Logo = styled.div``;

const MenuBar = styled.div`
  line-height: 100px;
  margin-right: 15px;

  & img {
    width: 40px;
    height: 40px;

    &:hover {
      cursor: pointer;
    }
  }
`;
