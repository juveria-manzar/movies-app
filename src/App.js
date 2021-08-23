import React from "react";

import Filter from './Filter'
import Navbar from "./Navbar";
import Search from "./Search";
import Table from "./Table";

class App extends React.Component {

  state = {
    movies: [],
    genres: [],
    selectedFilter: "All Genre"
  }

  setFilter = (filter) => {
    this.setState({ selectedFilter: filter })
  }

  toggleLike = (id) => {
    let index = this.state.movies.findIndex((el) => {
      return el._id === id;
    })
    
    let currMoviesArr = this.state.movies.map((el) => el)

    if (currMoviesArr[index].liked) {
      currMoviesArr[index].liked = false;
    } else {
      currMoviesArr[index].liked = true;
    }

    this.setState({movies:currMoviesArr});
  }

  componentDidMount() {
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
          <Filter handleFilter={this.setFilter}
            selectedFilter={this.state.selectedFilter}
            genreData={this.state.genres} />

          <div className="col-9 p-4">
            <Search />
            <Table
              selectedFilter={this.state.selectedFilter}
              moviesData={this.state.movies}
              toggleLike={this.toggleLike} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;