import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./common/utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  // TODO componentDidMount is getting deprecated - use hooks
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
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

  handleGenreItemSelect = (genreItem) => {
    this.setState({ selectedGenreItem: genreItem, currentPage: 1 });
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

    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenreItem,
    } = this.state;

    const filtered =
      selectedGenreItem && selectedGenreItem._id !== "All Genres"
        ? allMovies.filter((movie) => movie.genre._id === selectedGenreItem._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenreItem}
            onItemSelect={this.handleGenreItemSelect}
          />
        </div>
        <div className="col">
          <h2>showing {filtered.length} movies in the database</h2>
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
            itemsCount={filtered.length}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
