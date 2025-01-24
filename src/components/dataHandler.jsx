import axios from "axios";

const urlMovies = "/movies";
const urlBookedSeatsByMovies = "/bookedSeatsByMovie";
const urlTestBookings = "/testBookings";

export async function getMovies() {
  const response = await axios.get(urlMovies);
  return response.data;
}
export async function getBookedSeatsByMovie() {
  const response = await axios.get(urlBookedSeatsByMovies);
  return response.data;
}

export async function updateBookedSeatsByMovie(id, occupiedSeatIndexes) {
  await axios.put(`${urlBookedSeatsByMovies}/${id}`, occupiedSeatIndexes);
}

export async function addBooking(data) {
  await axios.post(urlTestBookings, data);
}

export async function getMovieById(id) {
  const movie = await axios.get(`${urlMovies}/${id}`);
  return movie.data;
}
