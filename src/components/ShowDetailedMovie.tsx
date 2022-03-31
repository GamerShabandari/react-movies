import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { IDetailedMovie } from "./models/IDetailedMovie";
import { IMovie } from "./models/IMovie";

export function ShowDetailedMovie() {

    const { id } = useParams();
    const [chosenMovie, SetChosenMovie] = useState<IDetailedMovie>({
        Title: "",
        Poster: "",
        Genre: "",
        Year: "",
        Runtime: "",
        Rated: "",
        Plot: "",
        Director: "",
        Metascore: "",
        imdbRating: "",
        imdbVotes: ""
    })

    useEffect(() => {
        let searchResultsSerialized: string = sessionStorage.getItem("searchResults") || "[]";
        let searchResultsDeSerialized: IMovie[] = JSON.parse(searchResultsSerialized)

        for (let i = 0; i < searchResultsDeSerialized.length; i++) {
            const result = searchResultsDeSerialized[i];

            if (result.Title === id) {

                axios.get<IDetailedMovie>("https://www.omdbapi.com/?t=" + result.Title + "&apikey=5ed1c386&s")
                    .then(response => {

                        let matchedMovie: IDetailedMovie = {

                            Title: response.data.Title,
                            Poster: response.data.Poster,
                            Genre: response.data.Genre,
                            Year: response.data.Year,
                            Runtime: response.data.Runtime,
                            Rated: response.data.Rated,
                            Plot: response.data.Plot,
                            Director: response.data.Director,
                            Metascore: response.data.Metascore,
                            imdbRating: response.data.imdbRating,
                            imdbVotes: response.data.imdbVotes,

                        }

                        SetChosenMovie(matchedMovie);

                    })
            }
        }

    }, [id])

    function addMovieToFavorites() {

        let savedFavoritesSerialized: string = localStorage.getItem("myFavoriteMovies") || "[]";
        let savedFavoritesDeSerialized: IMovie[] = JSON.parse(savedFavoritesSerialized);

        if (savedFavoritesDeSerialized.length === 0) {
            localStorage.setItem("myFavoriteMovies", JSON.stringify([chosenMovie]));
        } else {
            for (let i = 0; i < savedFavoritesDeSerialized.length; i++) {
                const favorite = savedFavoritesDeSerialized[i];

                if (favorite.Title === chosenMovie.Title) {
                    return
                }

            }
            savedFavoritesDeSerialized.push(chosenMovie)
            localStorage.setItem("myFavoriteMovies", JSON.stringify(savedFavoritesDeSerialized));
        }

    }


    return (<>
        <Link className="backBtn" to="/">Back to results</Link>
        <div className="detailsCard">
            <h2 className="title">{chosenMovie.Title}</h2>
            <img src={chosenMovie.Poster} alt={"poster of " + chosenMovie.Title} />
            <div className="decorationLine"></div>
            <button className="favoritesBtn" onClick={addMovieToFavorites}>+</button>
            <h3 className="plot">{chosenMovie.Plot}</h3>
            <div className="decorationLine"></div>
            <h4 className="imdb"><em><strong>IMDB rating: </strong></em>{chosenMovie.imdbRating} with {chosenMovie.imdbVotes} votes</h4>
            <h5 className="metascore"><em><strong>Metascore: </strong></em>{chosenMovie.Metascore}</h5>
            <h5 className="rated"><em><strong>Rated: </strong></em>{chosenMovie.Rated}</h5>
            <h4 className="released"><em><strong>Released: </strong></em>{chosenMovie.Year}</h4>
            <h4 className="runtime"><em><strong>Runtime: </strong></em>{chosenMovie.Runtime}</h4>
            <h5 className="director"><em><strong>Director: </strong></em>{chosenMovie.Director}</h5>
            <h5 className="genre"><em><strong>Genre: </strong></em>{chosenMovie.Genre}</h5>
            
        </div>

    </>)
}