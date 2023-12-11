import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import CalendarPage from "./Pages/Calendar/CalendarPage";
import CalendarSelectionPage from "./Pages/Calendar/CalendarSelectionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Pages/Calendar" element={<CalendarPage />} />
        <Route
          path="/Pages/Calendar/Selection"
          element={<CalendarSelectionPage />}
        />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
