import { useEffect, useState } from "react";
import React from "react";
import MovieSelector from "./MovieSelector";
import ShowCase from "./ShowCase";
import SeatRow from "./SeatRow";
import Button from "./Button";
import Form from "./Form";
import { getMovies, addBooking, updateMovie } from "./dataHandler";
import { useNavigate } from "react-router-dom";

const seatRowCount = 6;
const MainPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [moviePrice, setMoviePrice] = useState(null);

  const [movies, setMovies] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [feedback, setFeedback] = useState("");

  async function fetchData() {
    try {
      const allMovies = await getMovies();
      const filteredMovies = allMovies.filter((movie) => movie.available);
      setMovies(filteredMovies);

      if (!selectedMovieId) {
        setMoviePrice(filteredMovies[0].price.value);
        setSelectedMovieId(filteredMovies[0].id);
        setSelectedMovie(filteredMovies[0].title);
        setOccupiedSeats(filteredMovies[0].occupiedSeatIndexes);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedMovieId]);

  useEffect(() => {
    movies.forEach((movie) => {
      if (movie.id === selectedMovieId) {
        setOccupiedSeats(movie.occupiedSeatIndexes);
      }
    });
  }, [selectedMovieId, movies]);

  const toggleSeatSelection = (seatIndex) => {
    setSelectedSeats((prev) =>
      prev.includes(seatIndex)
        ? prev.filter((index) => index !== seatIndex)
        : [...prev, seatIndex]
    );
    setBookError(false);
  };

  const handleMovieChange = (e) => {
    setSelectedSeats([]);
    setMoviePrice(e.target.value);
    setSelectedMovie(e.target.options[e.target.selectedIndex].innerText);
    setSelectedMovieId(e.target.options[e.target.selectedIndex].id);
  };

  const totalPrice = moviePrice ? moviePrice * selectedSeats.length : null;

  const [isFormOpen, setFormOpen] = useState(false);
  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  const [bookError, setBookError] = useState(false);
  const handleButtonClick = () => {
    if (selectedSeats.length > 0) {
      setBookError(false);
      toggleForm();
    } else {
      setBookError(true);
    }
  };

  const handleSubmit = async (data) => {
    const movie = movies.find((movie) => movie.id === selectedMovieId);
    const updatedMovie = {
      ...movie,
      occupiedSeatIndexes: [...occupiedSeats, ...selectedSeats],
    };
    await updateMovie(selectedMovieId, updatedMovie);

    const fullBookingInfo = {
      ...data,
      movieId: selectedMovieId,
      bookedSeats: selectedSeats,
    };
    await addBooking(fullBookingInfo);
    setSelectedSeats([]);

    fetchData();
    toggleForm();
    setFeedback("Booking succesfully submitted");
  };
  const navigate = useNavigate();
  const goToAdminPage = () => {
    navigate("/admin");
  };

  return (
    <>
      <div className={`wrapper ${isFormOpen ? "blur" : ""}`}>
        <Button text="Admin" onClick={goToAdminPage} isAbsolute />
        <header className="header">
          <h1>Movie Booking</h1>
        </header>
        <MovieSelector changeHandler={handleMovieChange} movies={movies} />
        <ShowCase />
        <div className="container">
          <div className="screen"></div>
          {[...Array(seatRowCount)].map((_, rowIndex) => (
            <SeatRow
              key={rowIndex}
              rowIndex={rowIndex}
              selectedSeats={selectedSeats}
              toggleSelectedSeats={toggleSeatSelection}
              occupiedSeats={occupiedSeats}
            />
          ))}
        </div>
        {totalPrice !== null ? (
          <p className="text">
            You have selected <span id="count">{selectedSeats.length}</span>{" "}
            seats for a price of <span id="total">{totalPrice}</span>kr
          </p>
        ) : null}
        <Button text="Book" onClick={handleButtonClick} />
        {bookError && (
          <p className="error-message show">Select wanted seats to continue</p>
        )}
        {feedback && (
          <div className="feedback-window">
            <div className="feedback">{feedback}</div>
            <div>
              <Button text="OK" onClick={() => setFeedback("")} />
            </div>
          </div>
        )}
      </div>
      {isFormOpen && (
        <Form
          selectedMovieName={selectedMovie}
          totalPrice={totalPrice}
          numberOfSeats={selectedSeats.length}
          toggleForm={toggleForm}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default MainPage;
