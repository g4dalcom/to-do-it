import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { getTodos } from "../redux/todo";
import { useEffect } from "react";
import DayList from "../components/DayList";

const History = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const todos = useSelector((state) => state);
  console.log("todos = ", todos);
  return (
    <>
      <Header />
      <DayList todos={todos} />
    </>
  );
};

export default History;
