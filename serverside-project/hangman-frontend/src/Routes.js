import { Route, Routes } from "react-router-dom";
import Hangman from "./Hangman";
import Stats from "./Stats";

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={<Hangman />} />
      <Route exact path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default AppRoutes;
