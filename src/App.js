import React from "react";

import Filter from './Filter'
import Navbar from "./Navbar";
import Search from "./Search";
import Table from "./Table";
import Pagination from './Pagination';

class App extends React.Component {

  state = {
    movies: [],
    genres: [],
    selectedFilter: "All Genre"
  }

  setFilter = (filter) => {
    this.setState({ selectedFilter: filter })
  }

  componentDidMount() {
    //i will get data here
    let func = async () => {
      let responseGenres = await fetch("/genre");
      let responseMovies = await fetch("/movies");

      let movies = await responseMovies.json();
      let genres = await responseGenres.json();

      this.setState({
        movies,
        genres
      })
    };

    func();
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="row">
          <Filter handleFilter={this.setFilter} selectedFilter={this.state.selectedFilter} genreData={this.state.genres} />

          <div className="col-9 p-4">
            <Search />
            <Table moviesData={this.state.movies} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;