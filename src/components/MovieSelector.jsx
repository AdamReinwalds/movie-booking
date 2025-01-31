import React from "react";
import PropTypes from "prop-types";

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

MovieSelector.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.shape({
        value: PropTypes.number.isRequired,
        currencySuffix: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default MovieSelector;
