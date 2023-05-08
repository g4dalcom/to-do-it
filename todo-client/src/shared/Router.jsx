import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDoList from "../pages/ToDoList";
import Preparing from "../pages/Preparing";
import About from "../pages/About";
import History from "../pages/History";
import Loading from "../components/Loading";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/history" element={<History />} />
        <Route path="/calendar" element={<Preparing />} />
        <Route path="/about" element={<About />} />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
