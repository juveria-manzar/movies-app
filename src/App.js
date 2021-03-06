import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Filter from './Filter'
import Navbar from "./Navbar";
import Rentals from "./Rentals";
import Customer from "./Customer";
import Login from "./Login";
import Search from "./Search";
import Table from "./Table";

class App extends React.Component {

  state = {
    movies: [],
    genres: [],
    selectedFilter: "All Genre",
    search: ""
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

    this.setState({ movies: currMoviesArr });
  }

  deleteMovie = (id) => {
    let filterredArr = this.state.movies.filter((el) => {
      return el._id != id;
    })

    this.setState({ movies: filterredArr })
  }

  updateSearch = (searchString) => {
    this.setState({ search: searchString })
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
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/rentals">
              <Rentals />
            </Route>
            <Route path="/customers">
              <Customer />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <div className="row">
                <Filter handleFilter={this.setFilter}
                  selectedFilter={this.state.selectedFilter}
                  genreData={this.state.genres} />

                <div className="col-9 p-4">
                  <Search search={this.state.search} updateSearch={this.updateSearch} total={this.state.movies.length} />
                  <Table
                    search={this.state.search}
                    selectedFilter={this.state.selectedFilter}
                    moviesData={this.state.movies}
                    toggleLike={this.toggleLike}
                    deleteMovie={this.deleteMovie} />
                </div>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>

    )
  }
}

export default App;