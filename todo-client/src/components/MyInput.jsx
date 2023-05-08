import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

export const MyInput = ({
  element,
  todo,
  modifiedAt,
  checked,
  handleValueChange,
  setTodo,
  setComplete,
}) => {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(todo);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  useEffect(() => {
    setNewValue(todo);
  }, [todo]);

  // todo 수정 핸들러
  const updateHandler = () => {
    axios
      .put(`http://localhost:8080/api/todos/${element.id}`, {
        content: newValue,
        checked: element.checked,
      })
      .then(setComplete(true));
  };

  const handleClick = () => {
    setEditMode(true);
  };

  const handleBlur = () => {
    setEditMode(false);
    updateHandler();
  };

  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <InputBox onClick={handleClick}>
      {isEditMode ? (
        <InputEdit
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => enterHandler(e)}
          onBlur={handleBlur}
          type="text"
          value={newValue}
          ref={inputEl}
        />
      ) : (
        <>
          <span>{newValue}</span>
        </>
      )}
    </InputBox>
  );
};

export const InputBox = styled.div`
  text-align: center;
  display: inline-block;
  width: 300px;
  height: 35px;
  border: 1px #bbb dashed;
  border-radius: 10px;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    background-color: #bea0e6;
  }
`;

export const InputEdit = styled.input`
  text-align: center;
  display: inline-block;
  width: 300px;
  height: 30px;
  font-size: 22px;
  font-family: "Dongle", sans-serif;
`;
