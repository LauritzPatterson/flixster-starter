import { useState } from "react";
import "./App.css";
import Header from "./components/Header"; // Title bar
import Footer from "./components/Footer"; // Footer bar
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleCardClick = async (movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${
          import.meta.env.VITE_API_KEY
        }&append_to_response=videos` //  This fetches the trailer videos
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <MovieList onCardClick={handleCardClick} />
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
