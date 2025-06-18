import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons

const MovieCard = ({ title, posterPath, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevents opening the modal when heart is clicked
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={imageUrl} alt={title} />
      <h4>{title}</h4>
      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? (
          <FaHeart color="#F16FB4" size={20} />
        ) : (
          <FaRegHeart color="#F16FB4" size={20} />
        )}
      </button>
    </div>
  );
};

export default MovieCard;