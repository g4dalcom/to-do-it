import { useEffect, useState } from "react";
import axios from "axios";
import styled, { keyframes, css } from "styled-components";
import { MyInput } from "./MyInput";
import dayjs from "dayjs";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [complete, setComplete] = useState(true); // axios 호출 성공시 true
  const [attain, setAttain] = useState(0); // 달성한 todo 개수
  const [checked, setChecked] = useState(false);
  const day = dayjs(todo.createdAt).subtract(9, "hour").format("YYYY-MM-DD");

  // 모든 TO-DO-LIST 불러오기
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/todos")
      .then((res) => {
        setTodos(
          res.data
            .sort((a, b) => a.checked - b.checked)
            .filter((e) => e.createdAt.slice(0, 10) === day)
        );
        setAttain(
          res.data.filter(
            (e) => e.checked === 1 && e.createdAt.slice(0, 10) === day
          ).length
        );
      })
      .then(setComplete(false));
  }, [complete]);

  const valueChangeHandler = (e) => {
    setTodo(e.target.value);
  };

  // todo 등록 핸들러
  const submitHandler = () => {
    if (todo === "") {
      window.alert("내용을 입력해주세요!");
    } else {
      axios
        .post("http://localhost:8080/api/todos", { content: todo })
        .then(setComplete(true))
        .then(setTodo(""));
    }
  };

  // checkbox 핸들러
  const checkHandler = (e) => {
    console.log(e);
    axios
      .put(`http://localhost:8080/api/todos/${e.id}`, {
        content: e.content,
        checked: e.checked === 1 ? 0 : 1,
      })
      .then(setChecked(!checked))
      .then(setComplete(true));
  };

  // todo 삭제 핸들러
  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8080/api/todos/${id}`)
      .then(setComplete(true));
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  return (
    <>
      <MainContainer>
        <FixedContainer>
          {/* 달성도 */}
          <AttainContainer>
            <div>오늘 목표 달성도</div>
            <Chart>
              <Bar attain={(attain / todos.length) * 100}></Bar>

              {todos.length > 0 ? (
                <span>{Math.ceil((attain / todos.length) * 100)}%</span>
              ) : (
                <span>0%</span>
              )}
            </Chart>
          </AttainContainer>

          {/* 투두 등록 바 */}
          <InputContainer>
            <InputForm
              onChange={valueChangeHandler}
              onKeyDown={(e) => enterHandler(e)}
              type="text"
              value={todo}
              placeholder="              오늘 할 일을 등록해주세요!"
            />
            <InputBtn
              onClick={() => submitHandler()}
              type="button"
              value="➕"
            />
          </InputContainer>
        </FixedContainer>

        {/* 투두 리스트 */}
        <TodoContainer>
          {todos.length === 0 ? (
            <EmptyTodo>오늘의 첫 TODO를 등록해주세요!</EmptyTodo>
          ) : (
            todos.map((e) => {
              return (
                <TodoElement key={e.id} checked={e.checked}>
                  {/* 체크박스 */}
                  <CheckContainer>
                    <STCheck
                      type="checkbox"
                      checked={e.checked === 1 ? true : false}
                      readOnly
                    />
                    <STLabel
                      onClick={() => checkHandler(e)}
                      checked={e.checked === 1 ? true : false}
                      readOnly
                    ></STLabel>
                  </CheckContainer>

                  {/* 내용(Edit 모드 비활성) */}
                  <InputView>
                    <MyInput
                      element={e}
                      todo={e.content}
                      modifiedAt={e.modifiedAt}
                      checked={e.checked === 1 ? true : false}
                      handleValueChange={(todo) => setTodo(todo)}
                      setTodo={setTodo}
                      setComplete={setComplete}
                      readOnly
                    />
                  </InputView>

                  {/* 삭제 버튼 */}
                  <DelBtn
                    onClick={() => deleteHandler(e.id)}
                    type="button"
                    value="❌"
                    checked={e.checked === 1 ? true : false}
                    readOnly
                  />
                  {e.checked === 1 && <ModifiedAt>{e.modifiedAt}</ModifiedAt>}
                </TodoElement>
              );
            })
          )}
        </TodoContainer>
      </MainContainer>
    </>
  );
};

export default Todo;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const FixedContainer = styled.div`
  display: block;
  margin: 10px auto 30px;
`;

// 달성도 관련
const AttainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Chart = styled.div`
  background: rgba(145, 77, 77, 0.1);
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  padding: 0 5px;
  display: flex;
  height: 30px;
  width: 300px;

  & span {
    margin-left: 5px;
    margin-top: 5px;
    color: #bea0e6;
    font-weight: bolder;
  }
`;

const Load = (props) => keyframes`
    0% {
        width: 0%;
    }
    100% {
        width: ${props}%;
    }
`;

const Bar = styled.div`
  animation: ${(props) => Load(props.attain)} 1s normal forwards;
  box-shadow: 0 10px 40px -10px #fff;
  border-radius: 100px;
  background: #bea0e6;
  height: 22px;
  width: 0;
`;

// 투두 등록 바 관련
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-right: 20px;
  width: 100%;
  max-width: 90%;
  font-size: 16px;
  padding: 5px 15px;
  border-radius: 1.5em;
  border: solid 2px #eaecee;
  background-color: #fff;

  &:hover {
    border-color: #bea0e6;
  }

  &:focus-within {
    border-color: #bea0e6;
  }
`;

const InputForm = styled.input`
  border: none;
  width: 90%;
  font-size: 23px;
  font-family: "Dongle", sans-serif;

  &:focus {
    outline: none;
    border-color: #bea0e6;
  }
`;

const InputBtn = styled.input`
  border: none;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f3e27f;
  }
`;

// 투두리스트 관련
const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 80%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyTodo = styled.div`
  position: absolute;
  bottom: 50%;
`;

export const TodoElement = styled.div`
  display: flex;
  width: 400px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  float: left;
  list-style: none;
  position: relative;
  border-radius: 10px;
  margin: 5px 20px;
  padding: 15px 20px;
  box-shadow: 5px 9px 25px 0px rgb(0 0 0 / 12%);
  background-color: #f3e27f;

  ${({ checked }) =>
    checked
      ? css`
          background-color: #d3d3d3;
          &:after: {
            opacity: 1;
          }
        `
      : null}
`;

const DelBtn = styled.input`
  border: none;
  background-color: #f3e27f;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  cursor: pointer;

  ${({ checked }) =>
    checked
      ? css`
          background-color: #d3d3d3;
          &:after: {
            opacity: 1;
          }
        `
      : null}

  &:hover {
    background-color: #bea0e6;
  }
`;

// 체크박스 관련
export const CheckContainer = styled.div`
  position: relative;
`;

export const STCheck = styled.input`
  visibility: hidden;
  ${({ checked }) =>
    checked
      ? css`
          background-color: #66bb6a;
          border-color: #66bb6a;
          &:after: {
            opacity: 1;
          }
        `
      : null}
`;

export const STLabel = styled.label`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  width: 28px;
  height: 28px;
  position: absolute;
  left: 0;
  top: 5px;
  ${({ checked }) =>
    checked
      ? css`
          background-color: #66bb6a;
          border-color: #66bb6a;
          &:after {
            border: 2px solid #fff;
            border-top: none;
            border-right: none;
            content: "";
            height: 6px;
            left: 7px;
            position: absolute;
            top: 8px;
            transform: rotate(-45deg);
            width: 12px;
          }
        `
      : css`
          background-color: #fff !important;
          &:after {
            opacity: 1;
          }
        `}
`;

const ModifiedAt = styled.div`
  position: absolute;
  right: 0;
  left: 160px;
  bottom: 0;
  font-size: 20px;
  font-weight: 600;
  color: #66bb6a;
`;

export const InputView = styled.div`
  text-align: center;
  align-items: center;
  /* margin-top: 3rem; */

  div.view {
    margin-top: 3rem;
  }
`;
