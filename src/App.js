import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import CalendarPage from "./Pages/Calendar/CalendarPage";
import CalendarSelectionPage from "./Pages/Calendar/CalendarSelectionPage";
import CameraPage from "./Pages/Camera/CameraPage";

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
        <Route path="/Pages/Camera" element={<CameraPage />} />
        <Route />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
