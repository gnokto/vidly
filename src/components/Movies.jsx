import React, { Component } from "react";

import * as movieService from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./common/utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
  };
  constructor() {
    super();
    this.state.movies = movieService.getMovies();
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleToggle = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getColumns = () => {
    const columns = ["Title", "Genre", "Stock", "Rate", "-", ""];
    return columns.map((col) => (
      <th scope="col" key={col}>
        {col}
      </th>
    ));
  };

  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount === 0) return <h3>There are no movies in the database.</h3>;

    const { currentPage, pageSize, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <>
        <h2>showing {movieCount} movies in the database</h2>
        <table className="table table-hover">
          <thead>
            <tr>{this.getColumns()}</tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onToggle={() => this.handleToggle(movie)}
                  />
                </td>
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
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemsCount={movieCount}
          onPageChange={this.handlePageChange}
          pageSize={pageSize}
        />
      </>
    );
  }
}

export default Movies;
