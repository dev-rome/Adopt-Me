import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import SearchParams from "./components/SearchParams";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <h1>Adopt Me!</h1>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
