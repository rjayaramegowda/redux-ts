import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} ></Route>
      <Route path="/edit" element={<h1>Edit Page</h1>} ></Route>
      <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};

export default App;

