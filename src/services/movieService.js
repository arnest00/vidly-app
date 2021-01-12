import http from './httpService';

const apiEndpoint = 'http://localhost:3900/api/movies';

export async function getMovies() {
  return http.get(apiEndpoint);
};

// export function getMovie(id) {
//   return movies.find(m => m._id === id);
// };

// export function saveMovie(movie) {
//   let movieInDb = movies.find(m => m._id === movie._id) || {};
//   movieInDb.title = movie.title;
//   movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
//   movieInDb.numberInStock = movie.numberInStock;
//   movieInDb.dailyRentalRate = movie.dailyRentalRate;

//   if (!movieInDb._id) {
//     movieInDb._id = (Date.now()).toString();
//     movies.push(movieInDb);
//   };

//   return movieInDb;
// };

export function deleteMovie(id) {
  return http.delete(apiEndpoint + '/' + id);
};