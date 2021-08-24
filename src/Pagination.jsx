let Pagination = (props) => {

    let arr = [];
    for (let i = 1; i <= props.numberOfPages; i++) {
        arr.push(i);
    }
    return (
        <nav>
            <ul className="pagination mt-4">
                {arr.map((el) => {
                    return (
                        <li onClick={()=>{
                            props.selectPage(el)
                        }} className={`page-item ${props.currPage === el ? "active" : ""}`}><a className="page-link" href="#">{el}</a></li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Pagination;