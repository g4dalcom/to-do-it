# 프로젝트 소개

![](https://blog.kakaocdn.net/dn/mrA88/btsesbHWLCq/T546Yyuv7aeJfvq4IoclPK/img.gif)

- 프로젝트명: TO-DO-IT
- 리액트와 스프링부트를 연동한 투두리스트 어플리케이션

## 기술 스택

- <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=plastic&for-the-badge"> <img src="https://img.shields.io/badge/React-61DAFB?style=plastic&for-the-badge"> <img src="https://img.shields.io/badge/Redux toolkit-764ABC?style=plastic&for-the-badge"> <img src="https://img.shields.io/badge/Styled Component-DB7093?style=plastic&for-the-badge">
- <img src="https://img.shields.io/badge/JAVA-007396?style=plastic&for-the-badge"> <img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=plastic&for-the-badge"> <img src="https://img.shields.io/badge/Spring JPA-6DB33F?style=plastic&for-the-badge"> <img src="https://img.shields.io/badge/H2 embedded-007396?style=plastic&for-the-badge">

## 주요 기능

- 투두리스트 CRUD
	- 완료시 목록의 하단으로 이동, 완료 날짜 출력
	- 목표 달성도 실시간 반영
![](https://blog.kakaocdn.net/dn/ukbfR/btsd9NAWWr8/0tm6aeMwPatwpQFfXlpTe1/img.gif)

- 히스토리
	- 날짜별로 완료한 투두리스트 확인
![](https://blog.kakaocdn.net/dn/Begic/btsequy8K26/MsjTXgv036mh2aTTIrCkm0/img.gif)

- 데이터베이스 연동
![](https://blog.kakaocdn.net/dn/plfTr/btsep7YC3PR/S6h2Mjq9v4plB88d8lK3KK/img.gif)


## 주요 코드 내용

### 오늘의 투두리스트

```javascript
const [todos, setTodos] = useState([]);
const [complete, setComplete] = useState(true); // axios 호출 성공시 true
const [attain, setAttain] = useState(0); // 달성한 todo 개수
const [checked, setChecked] = useState(false);
const day = dayjs(todo.createdAt).subtract(9, "hour").format("YYYY-MM-DD");

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
```
- 모든 Todo를 불러온다.
- 히스토리 기능을 염두에 두고 모든 날짜의 투두를 받아오도록 했는데 데이터의 양이 늘어날 것을 생각한다면 API를 분리하는 게 맞는 것 같다.

#### 오늘 날짜만 filtering

- 어쨌든 모든 날짜를 불러왔기 때문에 오늘 날짜만을 받아오기 위해 filtering을 했다.
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbIlS73%2FbtserMmBH25%2F3IEx5fKZ8h9nMSuKl1xQj1%2Fimg.png)
- createdAt의 포맷은 yyyy-MM-dd HH:mm:ss 이므로 slice(0, 10)까지 잘라서 연월일만 남기고 현재 날짜 day와 일치하는 데이터만 가져온다.
```javascript
const day = dayjs(todo.createdAt).subtract(9, "hour").format("YYYY-MM-DD");
```


#### 완료된 투두를 목록 하단으로 내리기 위한 sorting
![](https://blog.kakaocdn.net/dn/3mvNY/btsezsBhBDJ/ea6Vu7cowH6hn682qROSy0/img.gif)

- 완료된 상태를 1, 완료되지 않은 상태는 0으로 checked라는 컬럼으로 데이터베이스에 저장된다.
- 양수일 경우 데이터의 순서가 바뀌므로 **a.checked - b.checked** 를 해주었다.


#### 달성도 구현을 위한 로직

- 달성도는 **오늘 완료한 투두의 수 / 오늘 전체 투두의 수 * 100** 이다.
- 따라서 오늘 날짜에 checked === 1인 투두의 개수를 attain 변수에 저장해두었다.

```jsx
{todos.length > 0 ? (
	<span>{Math.ceil((attain / todos.length) * 100)}%</span>
  ) : (
	<span>0%</span>
  )}
```
- 오늘 날짜의 전체 투두의 개수 todos와 위에서 저장한 attain을 이용해 달성도를 구현한 JSX 내용!

```javascript
<Bar attain={(attain / todos.length) * 100}></Bar>
```

```CSS
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
```
- 달성도의 움직임은 animation을 이용하였다.
- 달성률((attain / todos.length) * 100)을 props로 받아서 keyframes 에 넘겨준 뒤 받아온 데이터를 width의 %로 표시하였다!

#### 투두 수정하기 기능

![](https://blog.kakaocdn.net/dn/0y9JH/btseySNPjg3/UojMCGRifOYY1kZ6QPXE4K/img.gif)

- 각 투두 컨테이너를 클릭하면 text를 입력할 수 있는 input창으로 변화된다. (edit mode)
- 내용을 변경하고 엔터 혹은 아무 곳이나 마우스 클릭을 해서 focus를 벗어나게 하면 수정을 위한 put요청을 보낸다.

```javascript
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
```
- edit mode가 비활성화 된 상태

```javascript
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
```
- edit mode가 활성화 된 상태

```javascript
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
```
- useRef()로 edit mode일 때 포커싱을 해두고 onBlur() 이벤트가 발생하면 edit mode를 false로 바꾸고 새로운 value를   가지고 axios 요청을 보낸다!
- 이 때 체크박스의 상태 checked는 이전 상태 그대로 보내서 바뀌지 않도록 하였다.


#### 투두 완료(체크박스) 기능

```javascript
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
```
- 체크의 상태는 이전 상태의 반대로 세팅을 해주고 투두의 내용은 이전 상태 그대로 전달해서 put 요청을 보낸다!

#### 투두 완료시 컨테이너 색상 변화

```CSS
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
```
- 투두 완료시(checked === true) 컨테이너의 색상은 styled-components의 css를 import해서 구현하였다!

## 히스토리 기능

![](https://blog.kakaocdn.net/dn/v2n34/btsex15MvIn/tHecuQD5t9kPsMtk3n2CZk/img.gif)

- 날짜별 완료한 투두의 내용을 확인한다.
- 이 때 날짜는 최근 날짜순으로 정렬이 된다.

### 데이터 날짜별 분류

- 투두리스트는 모든 데이터를 불러와서 오늘 날짜의 투두만 필터링하는데, 히스토리는 모든 날짜의 완료된 투두가 날짜의 역순으로 정렬된 상태가 필요하다.
- 그래서 redux toolkit으로 전역 상태 관리를 해서 각각의 컴포넌트에서 필요한 가공을 하면 좋겠다고 생각했다!

#### Redux-toolkit store

```javascript
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

export default store;
```

#### Provider로 묶어주기

```javascript
import "./App.css";
import Router from "./shared/Router";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;

```

#### action 및 reducers

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
};

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  const res = await axios.get("http://localhost:8080/api/todos");
  const data = await res.data;

  return data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default todoSlice.reducer;
```


![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2Tibx%2FbtseyM7VIkP%2FQRiesIqAM8KEKSKRrtVkhk%2Fimg.png)
- 데이터는 위와같이 분류되지 않은 상태로 들어온다.

```javascript
  const partition = {};

  todos["todo"].todos.forEach((todo) => {
    const day = dayjs(todo.createdAt).subtract(9, "hour").format("YYYY.MM.DD");

    if (partition[day]) {
      partition[day].push(todo);
    } else {
      partition[day] = [todo];
    }
  });

  return partition;
```
- 각각의 createdAt을 연월일만 남겨서 day라는 변수에 저장을 하고 그 값을 키값으로 새로운 객체에 저장을 해서 반환을 하는 방법을 사용했다!

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcweWvc%2Fbtsesd0vrSP%2FVh2qZWZu4JqYLs86JSrGT0%2Fimg.png)
- 같은 날짜를 가진 요소들끼리 하나의 키에 묶이게 되는 것을 볼 수 있다!
