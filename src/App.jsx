import "./App.css";
import { useState } from "react";
import AdoptedPetContext from "./context/AdoptedPetContext";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./pages/Details";
import SearchParams from "./components/SearchParams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App() {
  const adoptedPet = useState(null);

  return (
    <>
      <main>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AdoptedPetContext.Provider value={adoptedPet}>
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </AdoptedPetContext.Provider>
          </QueryClientProvider>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
