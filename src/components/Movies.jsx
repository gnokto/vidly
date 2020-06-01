import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "./common/utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenreItem: null,
    sortColumn: { path: "title", order: "asc" },
  };

  // TODO componentDidMount is getting deprecated - use hooks
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLikeToggle = (movie) => {
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
    this.setState({
      selectedGenreItem: genreItem,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenreItem: null,
      currentPage: 1,
    });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenreItem,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenreItem && selectedGenreItem._id)
      filtered = allMovies.filter(
        (movie) => movie.genre._id === selectedGenreItem._id
      );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: movieCount } = this.state.movies;
    if (movieCount === 0) return <h3>There are no movies in the database.</h3>;

    const { currentPage, pageSize, sortColumn, searchQuery } = this.state;

    const { totalCount, data: movies } = this.getPageData();

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
          <Link
            to="/movies/new"
            className="btn btn-primary btn-sm"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <h2>Showing {totalCount} movies in the database</h2>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLikeToggle}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            currentPage={currentPage}
            itemsCount={totalCount}
            onPageChange={this.handlePageChange}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
