import { Link } from "react-router-dom";
import { IMovie } from "./models/IMovie"

interface IShowMovieProps {
    movie: IMovie;
}

export function ShowMovie(props: IShowMovieProps) {
    return (<>

        <Link to={"/details/" + props.movie.Title}>
            <div className="movieCard" >
            <img className="cardImg" src={props.movie.Poster} alt={"poster of " + props.movie.Title} width="200px" />


            </div>
          
        </Link>

    </>)
}