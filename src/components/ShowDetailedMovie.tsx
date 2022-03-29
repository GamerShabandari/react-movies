import { Link, useParams } from "react-router-dom"

export function ShowDetailedMovie(){

    const { id } = useParams();


    return (<>
    <Link to="/">Hem igen</Link>
    <div>Show detailed movie works</div>
    <p>{id}</p>
    </>)
}