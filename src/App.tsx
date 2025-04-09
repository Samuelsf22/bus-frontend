import { BrowserRouter, Route, Routes } from "react-router";
import BusPage from "./components/bus/BusPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BusPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
