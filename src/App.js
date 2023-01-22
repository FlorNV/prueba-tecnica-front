import { useContext, useEffect } from "react";
import Cards from "./components/Cards";
import Filters from "./components/Filters";
import { FavoritesContext } from "./contexts/FavoritesContext";
import { PostingsContext } from "./contexts/PostingsContext";
import { postings as postingsList } from "./mockedPostings";

function App() {
  const { setPostings } = useContext(PostingsContext);
  const { setFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    setPostings(postingsList);
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      setFavorites(JSON.parse(favorites));
    }
  }, [setPostings, setFavorites]);

  return (
    <div className="App">
      <Filters />
      <Cards />
    </div>
  );
}

export default App;
