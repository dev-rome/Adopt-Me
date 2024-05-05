import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./pages/Details";
import SearchParams from "./components/SearchParams";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
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
