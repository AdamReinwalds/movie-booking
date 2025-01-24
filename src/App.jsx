import "./App.css";
import { useEffect, useState } from "react";
import MovieSelector from "./components/MovieSelector";
import ShowCase from "./components/ShowCase";
import SeatRow from "./components/SeatRow";
import Button from "./components/Button";
import Form from "./components/Form";
import {
  getMovies,
  addBooking,
  getBookedSeatsByMovie,
  updateBookedSeatsByMovie,
} from "./components/dataHandler";

//Att fixa:
//Admin knapp med tillhörande sida
//Form ska va telefonnummer inte mail
//react-router-dom

const seatRowCount = 6;
const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [moviePrice, setMoviePrice] = useState(null);

  const [movies, setMovies] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [bookedSeatsByMovie, setBookedSeatsbyMovie] = useState([]);

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const movies = await getMovies();
        //Fråga p vad han tycker om min kassa lösning
        if (selectedMovieId === "") {
          setMovies(movies);
          setMoviePrice(movies[0].price.value);
          setSelectedMovieId(movies[0].id);
          setSelectedMovie(movies[0].title);
        }
        const fetchedMovieSeatInfo = await getBookedSeatsByMovie();

        setBookedSeatsbyMovie(fetchedMovieSeatInfo);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [refreshTrigger, selectedMovieId]);

  useEffect(() => {
    bookedSeatsByMovie.forEach((obj) => {
      if (obj.movieId === selectedMovieId) {
        setOccupiedSeats(obj.occupiedSeatIndexes);
        console.log(selectedMovieId);
      }
    });
  }, [selectedMovieId, bookedSeatsByMovie, refreshTrigger]);

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
    const bookingIdToUpdate = bookedSeatsByMovie.find(
      (booking) => booking.movieId === selectedMovieId
    );
    const updatedBooking = {
      ...bookingIdToUpdate,
      occupiedSeatIndexes: [...occupiedSeats, ...selectedSeats],
    };
    await updateBookedSeatsByMovie(selectedMovieId, updatedBooking);

    const fullBookingInfo = {
      ...data,
      movieId: selectedMovieId,
      bookedSeats: selectedSeats,
    };
    addBooking(fullBookingInfo);
    setSelectedSeats([]);

    //Används för att fetcha om från databasen
    //och sätta alla occupiedSeats på nytt
    setRefreshTrigger(!refreshTrigger);
    toggleForm();
  };

  const openAdminPanel = () => {};

  return (
    <>
      <Button className="admin-button" text="Admin" onClick={openAdminPanel} />
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
          You have selected <span id="count">{selectedSeats.length}</span> seats
          for a price of $<span id="total">{totalPrice}</span>
        </p>
      ) : null}
      <Button text="Book" onClick={handleButtonClick} />
      {bookError && <p>Select wanted seats to continue</p>}
      {isFormOpen && (
        <Form
          selectedMovieName={selectedMovie}
          totalPrice={totalPrice}
          toggleForm={toggleForm}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default App;
