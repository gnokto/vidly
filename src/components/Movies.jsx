import React, { Component } from "react";

import * as movieService from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: [],
  };
  constructor() {
    super();
    this.state.movies = movieService.getMovies();
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  getMovies = () => {
    return this.state.movies.map((movie) => (
      <tr key={movie._id}>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.handleDelete(movie)}
            type="button"
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };
  getColumns = () => {
    const columns = ["Title", "Genre", "Stock", "Rate", ""];
    return columns.map((col) => (
      <th scope="col" key={col}>
        {col}
      </th>
    ));
  };

  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount === 0) return <h3>There are no movies in the database.</h3>;

    return (
      <>
        <h2>showing {movieCount} movies in the database</h2>
        <table className="table table-hover">
          <thead>
            <tr>{this.getColumns()}</tr>
          </thead>
          <tbody>{this.getMovies()}</tbody>
        </table>
      </>
    );
  }
}

export default Movies;
