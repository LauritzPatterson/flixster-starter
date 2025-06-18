import React from "react";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const {
    title,
    runtime,
    release_date,
    genres,
    overview,
    backdrop_path,
    videos,
  } = movie;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        <div className="modal-details">
          <h2>{title}</h2>

          <img
            className="modal-image"
            src={`https://image.tmdb.org/t/p/w780${backdrop_path}`}
            alt={title}
          />

          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Overview:</strong> {overview}
          </p>
          <p>
            <strong>Genres:</strong> {genres.map((g) => g.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {runtime} minutes
          </p>

          {/* 🎬 Trailer or fallback message */}
          {videos?.results?.length > 0 ? (
            <div className="modal-trailer">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videos.results[0].key}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p style={{ color: "var(--accent)", marginTop: "1rem" }}>
              🚫 Trailer not available for this movie.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
