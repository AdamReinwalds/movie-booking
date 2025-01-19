import "./App.css";
import { useEffect, useState } from "react";
import MovieSelector from "./components/MovieSelector";
import ShowCase from "./components/ShowCase";
import SeatRow from "./components/SeatRow";
import data from "./movies.json";
//import axios from "axios";

//const url = "http://localhost:3000/movies";

// async function getMovies() {
//   const movies = await axios.get(url);
//   return movies.data;
// }

const seatRowCount = 6;
const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [moviePrice, setMoviePrice] = useState(null);

  const [movies, setMovies] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  useEffect(() => {
    // async function fetchMovies() {
    //   const movies = await getMovies();
    //   setMovies(movies);
    // }
    // fetchMovies();
    setMovies(data.movies);
    setMoviePrice(data.movies[0].price.value);
    setOccupiedSeats(data.occupiedSeatIndexes);
  }, []);

  const toggleSeatSelection = (seatIndex) => {
    setSelectedSeats((prev) =>
      prev.includes(seatIndex)
        ? prev.filter((index) => index !== seatIndex)
        : [...prev, seatIndex]
    );
  };

  const handleMovieChange = (e) => {
    setSelectedSeats([]);
    setMoviePrice(e.target.value);
  };

  const totalPrice = moviePrice ? moviePrice * selectedSeats.length : null;

  return (
    <>
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
    </>
  );
};

export default App;
