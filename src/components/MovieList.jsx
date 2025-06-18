import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const MovieList = ({ onCardClick }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Sorting option state
  const [sortOption, setSortOption] = useState("");

  const fetchNowPlaying = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&page=${pageNumber}`
      );

      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) =>
          pageNumber === 1 ? data.results : [...prev, ...data.results]
        );
        setHasMore(true);
      }
    } catch (err) {
      console.error("Error fetching now playing movies:", err);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setIsSearching(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${encodeURIComponent(searchQuery)}`
      );

      setMovies(data.results);
      setHasMore(false); // No load more for search results
    } catch (err) {
      console.error("Error searching movies:", err);
    }
    setLoading(false);
  };

  const handleShowNowPlaying = () => {
    setIsSearching(false);
    setSearchQuery("");
    setPage(1);
    fetchNowPlaying(1);
  };

  useEffect(() => {
    if (!isSearching) {
      fetchNowPlaying(page);
    }
  }, [page]);

  //  Sorting function
  const sortMovies = (movies, option) => {
    const sorted = [...movies];
    switch (option) {
      case "title":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "release_date":
        return sorted.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "vote_average":
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return movies;
    }
  };

  return (
    <div className="movie-page">
      {/* Search bar section */}
      <div className="search-bar">
        <button onClick={handleShowNowPlaying} disabled={!isSearching}>
          Now Playing
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search movies..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/*  Sort dropdown */}
      <div
        className="sort-controls"
        style={{ textAlign: "center", margin: "1rem" }}
      >
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">-- Select --</option>
          <option value="title">Title (A-Z)</option>
          <option value="release_date">Release Date (Newest First)</option>
          <option value="vote_average">Vote Average (Highest First)</option>
        </select>
      </div>

      {/* Movie cards grid */}
      <div className="movie-list">
        {movies.length > 0 ? (
          sortMovies(movies, sortOption).map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
              onClick={() => onCardClick(movie)}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No movies found.</p>
        )}
      </div>

      {/* Load More button */}
      {!isSearching && hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          style={{ margin: "1.5rem auto", display: "block" }}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default MovieList;
