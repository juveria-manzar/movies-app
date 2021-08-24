import React from 'react'
import Pagination from './Pagination'
import './Table.css'

class Table extends React.Component {
    state = {
        currPage: 1
    }

    selectPage = (value) => {
        this.setState({ currPage: value })
    }
    render() {
        let allMovies = this.props.moviesData
        let currFilter = this.props.selectedFilter


        let filteredMoviesArray = allMovies.filter((el) => {
            if (currFilter === "All Genre")
                return el;
            else if (el.genre.name === currFilter)
                return el;
        })

        let numberOfPages = Math.ceil(filteredMoviesArray.length / 4);

        
        let startPage = (this.state.currPage - 1) * 4;
        let endPage = Math.min(filteredMoviesArray.length, this.state.currPage * 4);

        let arrayToBeUsed = filteredMoviesArray.slice(startPage, endPage);
        return (
            <>
                <div class="row">
                    <div class="col-10">
                        <table class="table mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col">Stock</th>
                                    <th scope="col">Rate</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrayToBeUsed.map((movie) => {
                                    return <tr key={movie._id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre.name}</td>
                                        <td>{movie.numberInStock}</td>
                                        <td>{movie.dailyRentalRate}</td>
                                        <td onClick={() => {
                                            this.props.toggleLike(movie._id)
                                        }}>
                                            {movie.liked ? (<span class="material-icons-outlined">
                                                favorite
                                            </span>) : <span class="material-icons-outlined">
                                                favorite_border
                                            </span>}
                                        </td>
                                        <td> <button onClick={() => { this.props.deleteMovie(movie._id) }} className="table-delete-btn">Delete</button> </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    selectPage={this.selectPage}
                    currPage={this.state.currPage}
                    numberOfPages={numberOfPages} />
            </>
        )
    }

}

export default Table