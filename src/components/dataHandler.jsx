import axios from "axios";

const urlMovies = "/movies";
const urlTestBookings = "/bookings";

export async function getMovies() {
  const response = await axios.get(urlMovies);
  return response.data;
}

export async function updateMovie(id, occupiedSeatIndexes) {
  await axios.put(`${urlMovies}/${id}`, occupiedSeatIndexes);
}

export async function addBooking(data) {
  await axios.post(urlTestBookings, data);
}

//AdminPage
export async function getMovieById(id) {
  const movie = await axios.get(`${urlMovies}/${id}`);
  return movie.data;
}
export async function addMovie(data) {
  await axios.post(urlMovies, data);
}

export async function updateMovieAdmin(id, data) {
  await axios.put(`${urlMovies}/${id}`, data);
}

export async function deleteMovieAdmin(id, data) {
  await axios.put(`${urlMovies}/${id}`, data);
}
