import Pagination from './Pagination'

let Table = (props) => {

    let allMovies = props.moviesData
    let currFilter = props.selectedFilter

    let filteredMoviesArray = allMovies.filter((el) => {
        if (currFilter === "All Genre")
            return el;
        else if (el.genre.name == currFilter)
            return el
    })
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
                            {filteredMoviesArray.map((movie) => {
                                return <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td>Like</td>
                                    <td> <button>Delete</button> </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination />
        </>
    )
}

export default Table