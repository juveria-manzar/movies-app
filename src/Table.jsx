import Pagination from './Pagination'
import './Table.css'

let Table = (props) => {
    console.log(props)

    let allMovies = props.moviesData
    let currFilter = props.selectedFilter

    let filteredMoviesArray = allMovies.filter((el) => {
        if (currFilter === "All Genre")
            return el;
        else if (el.genre.name == currFilter)
            return el;
    })

    let arrayToBeUsed = filteredMoviesArray.slice(0, 4);
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
                                        props.toggleLike(movie._id)
                                    }}>
                                        {movie.liked ? (<span class="material-icons-outlined">
                                            favorite
                                        </span>) : <span class="material-icons-outlined">
                                            favorite_border
                                        </span>}
                                    </td>
                                    <td> <button className="table-delete-btn">Delete</button> </td>
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