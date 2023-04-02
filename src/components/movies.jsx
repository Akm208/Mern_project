import React, { useState } from 'react';
import { getMovies } from './services/fakeMovieService'
import Like from './common/like';

const Movies = () => {
  const [movies, setMovies] = useState(getMovies());

  const handleDelete = (movie) => {
    const updatedMovies = movies.filter(m => m._id !== movie._id);
    setMovies(updatedMovies);
  };

  const handleLike = (movie) => {
    const updatedMovies = [...movies];
    const index = updatedMovies.indexOf(movie);
    updatedMovies[index] = { ...updatedMovies[index] };
    updatedMovies[index].liked = !updatedMovies[index].liked;
    setMovies(updatedMovies);
  };

  const count = movies.length;

  if (count === 0) return <p>There are no movies in database</p>;

  return (
    <React.Fragment>
      <p>Showing {count} movies in the database </p>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
            <th>#</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td><Like liked={movie.liked} onClick={() => handleLike(movie)} /></td>
              <td><button onClick={() => handleDelete(movie)} className='btn btn-danger btn-sm '>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Movies;
