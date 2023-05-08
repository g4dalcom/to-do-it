import dayjs from "dayjs";

const Partitioning = (todos) => {
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
};

export default Partitioning;
