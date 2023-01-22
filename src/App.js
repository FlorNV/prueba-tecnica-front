import { useContext, useEffect } from "react";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import { PostingsContext } from "./contexts/PostingsContext";
import { postings as postingsList } from "./mockedPostings";

function App() {
  const { setPostings } = useContext(PostingsContext);

  useEffect(() => {
    setPostings(postingsList);
  }, [setPostings]);

  return (
    <div className="App">
      <Filters />
      <Cards />
    </div>
  );
}

export default App;
