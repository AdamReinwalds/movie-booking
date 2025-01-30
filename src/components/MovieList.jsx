import React from "react";
import Button from "./Button";

const MovieList = ({ movies, onUpdate, onDelete, onAdd }) => {
  return (
    <div className="movie-list">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <Button text="Add Movie" onClick={onAdd} />
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>
                <Button text="Update" onClick={() => onUpdate(movie.id)} />
                <Button text="Delete" onClick={() => onDelete(movie.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
