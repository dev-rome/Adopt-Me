import "./App.css";
import Pet from "./components/Pet";
import SearchParams from "./components/SearchParams";

function App() {
  return (
    <>
      <main>
        <div>
          <h1>Adopt Me!</h1>
        </div>
        <SearchParams />
      </main>
    </>
  );
}

export default App;