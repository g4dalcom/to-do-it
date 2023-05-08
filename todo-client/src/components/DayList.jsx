import { useMemo, useState } from "react";
import Partitioning from "./Partitioning";
import styled from "styled-components";
import { TodoElement, CheckContainer, STCheck, STLabel } from "./Todo";

const DayList = ({ todos }) => {
  const [select, setSelect] = useState("");
  console.log("select = ", select);

  const radioValueHandler = (e) => {
    setSelect(e.target.value);
  };

  const radioClickHandler = (e) => {
    if (e.target.value === select) setSelect("");
  };

  const partition = useMemo(() => {
    if (!todos) return;
    return Partitioning(todos || []);
  }, [todos]);

  console.log("daylist partition = ", partition);
  console.log("todos = ", todos);

  return (
    <>
      <STTitle>
        <PageTitle>History | </PageTitle>
        <PageInfo>그동안 완료한 내역들을 확인할 수 있어요!</PageInfo>
      </STTitle>
      <HistoryWrapper>
        {Object.entries(partition)
          .reverse()
          .map(([day, todos]) => (
            <STUl key={day}>
              <DayContainer>
                <STDay>{day}</STDay>
                <CheckContainer>
                  <STCheck
                    type="radio"
                    id={day}
                    value={day}
                    checked={select === day ? true : false}
                    onChange={radioValueHandler}
                    onClick={radioClickHandler}
                  />
                  <HistoryLabel
                    for={day}
                    checked={select === day ? true : false}
                  />
                </CheckContainer>
              </DayContainer>
              {day === select &&
                (todos.filter((e) => e.checked === 1).length === 0 ? (
                  <EmptyTodo>완료한 TODO가 없습니다.</EmptyTodo>
                ) : (
                  todos.map(
                    (el) =>
                      el.checked === 1 && (
                        <HistoryElement key={el.id}>
                          <HContent>{el.content}</HContent>
                          <HModifiedAt>{el.modifiedAt}</HModifiedAt>
                        </HistoryElement>
                      )
                  )
                ))}
            </STUl>
          ))}
      </HistoryWrapper>
    </>
  );
};

export default DayList;

const HistoryWrapper = styled.div`
  height: 70%;
`;

const STTitle = styled.div`
  position: fixed;
  top: 80px;
  left: 500px;
`;

const PageTitle = styled.span`
  font-size: 60px;
`;

const PageInfo = styled.span`
  font-size: 25px;
`;

const DayContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const STUl = styled.ul`
  font-size: 40px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const STDay = styled.span`
  margin-right: 30px;
`;

const HistoryElement = styled(TodoElement)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  font-size: 30px;
`;

const HContent = styled.div``;

const HModifiedAt = styled.div`
  font-size: 18px;
  position: absolute;
  bottom: 0;
  right: 20px;
`;

const HistoryLabel = styled(STLabel)`
  position: absolute;
  top: 11px;
`;

const EmptyTodo = styled.div`
  font-size: 22px;
`;
