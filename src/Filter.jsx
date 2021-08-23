

let Filter = (props) => {
    return (
        <div class="col-3">
            <ul class="list-group m-4">
                <li onClick={(e) => {
                    props.handleFilter("All Genre")
                }} class={`list-group-item ${props.selectedFilter == "All Genre" ? "active" : ""} `}>All Genre</li>
                {
                    props.genreData?.map((genre) => {
                        return <li onClick={(e) => {
                            props.handleFilter(genre.name)
                        }} key={genre._id}
                            class={`list-group-item ${props.selectedFilter == genre.name ? "active" : ""} `}>
                            {genre.name}
                        </li>
                    })
                }
            </ul>
        </div>
    );
}

export default Filter