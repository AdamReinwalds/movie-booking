import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import {
  addMovie,
  getMovies,
  deleteMovieAdmin,
  updateMovieAdmin,
} from "./dataHandler";
import MovieList from "./MovieList";

const AdminPage = () => {
  const navigate = useNavigate();
  const goToBookingPage = () => {
    navigate("/");
  };

  const [movies, setMovies] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visibleSection, setVisibleSection] = useState(null);
  const [movieData, setMovieData] = useState({
    id: "",
    title: "",
    price: {
      value: 0,
      currencySuffix: "kr",
    },
    occupiedSeatIndexes: [],
    available: true,
  });

  useEffect(() => {
    async function fetchMovies() {
      const allMovies = await getMovies();
      const filteredMovies = allMovies.filter((movie) => movie.available);
      setMovies(filteredMovies);
    }
    fetchMovies();
  }, [refreshTrigger]);

  const handleInput = (key, value) => {
    if (key === "title" && value.trim() === "")
      setErrorMessage("Title is required");
    else if (key === "price.value" && (isNaN(value) || value <= 0))
      setErrorMessage("Price must be a positive number.");
    else setErrorMessage("");

    if (key.includes(".")) {
      const keys = key.split(".");
      setMovieData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: parseInt(value),
        },
      }));
    } else {
      setMovieData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleUpdate = (id) => {
    const movieToUpdate = movies.find((movie) => movie.id === id);
    setMovieData(movieToUpdate);
    setVisibleSection("updateSection");
    setErrorMessage("");
    setFeedback("");
  };

  const handleUpdateSubmit = async () => {
    await updateMovieAdmin(movieData.id, movieData);
    setVisibleSection(null);
    setFeedback("Movie Succesfully Updated!");
    setRefreshTrigger(!refreshTrigger);
  };
  const handleAdd = () => {
    setMovieData(movieData.id === "");
    setVisibleSection("addSection");
    setErrorMessage("");
    setFeedback("");
  };

  const handleMovieSubmit = async () => {
    if (!errorMessage) {
      addMovie(movieData);
      setVisibleSection(null);
      setRefreshTrigger(!refreshTrigger);
      setFeedback("Movie Succesfully Added!");
    }
  };
  const handleDelete = async (id) => {
    const movieToDelete = movies.find((movie) => movie.id === id);
    const data = { ...movieToDelete, available: false };
    await deleteMovieAdmin(id, data);
    setRefreshTrigger(!refreshTrigger);
    setFeedback("Movie Succesfully Deleted!");
  };

  return (
    <div className="admin-page">
      <Button text="Booking" onClick={goToBookingPage} isAbsolute />
      <header className="header">
        <h1>Movie Management</h1>
      </header>
      {feedback && (
        <div className="feedback-window">
          <div className="feedback">{feedback}</div>
          <div>
            <Button text="OK" onClick={() => setFeedback("")} />
          </div>
        </div>
      )}
      {visibleSection === "updateSection" && (
        <div className="adminpage__add-movie-container" id="updateSection">
          <h2>Update Movie</h2>
          <div className="adminpage__add-movie-container__input-field">
            <div>
              <input
                className="input-field__title-input"
                value={movieData.title}
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => {
                  handleInput("title", e.target.value);
                }}
              />
              <input
                className="input-field__price-input"
                value={
                  !isNaN(movieData.price.value) ? movieData.price.value : ""
                }
                type="text"
                id="price"
                placeholder="Price (kr)"
                onChange={(e) => {
                  handleInput("price.value", e.target.value);
                }}
              />
            </div>
            <div className="adminpage__button-container">
              <Button
                text="Save"
                onClick={handleUpdateSubmit}
                disabled={errorMessage}
              />
              <Button
                text="Cancel"
                onClick={() => {
                  setVisibleSection(null);
                }}
              />
            </div>
          </div>
          <div className="error-message-container">
            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
          </div>
        </div>
      )}
      {visibleSection === "addSection" && (
        <div className="adminpage__add-movie-container" id="addSection">
          <h2>Add Movie</h2>
          <div className="adminpage__add-movie-container__input-field">
            <div>
              <input
                className="input-field__title-input"
                type="text"
                id="title"
                placeholder="Title"
                onChange={(e) => {
                  handleInput("title", e.target.value);
                }}
              />
              <input
                className="input-field__price-input"
                type="text"
                id="price"
                placeholder="Price (kr)"
                onChange={(e) => {
                  handleInput("price.value", e.target.value);
                }}
              />
            </div>
            <div className="adminpage__button-container">
              <Button
                text="Add Movie"
                onClick={handleMovieSubmit}
                disabled={errorMessage}
              />
              <Button
                text="Cancel"
                onClick={() => {
                  setVisibleSection(null);
                }}
              />
            </div>
          </div>
          <div className="error-message-container">
            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
          </div>
        </div>
      )}
      <div className="movie-list">
        <MovieList
          movies={movies}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
};

export default AdminPage;
