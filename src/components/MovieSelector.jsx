import React from "react";

const MovieSelector = ({ changeHandler, movies }) => {
  const movieOptions = movies.map((movie) => (
    <option key={movie.id} id={movie.id} value={movie.price.value}>
      {`${movie.title} (${movie.price.value}${movie.price.currencySuffix})`}
    </option>
  ));

  return (
    <div className="movie-container">
      <label htmlFor="movie">Pick a movie:</label>
      <select name="movie" id="movie" onChange={changeHandler}>
        {movieOptions}
      </select>
    </div>
  );
};

export default MovieSelector;
