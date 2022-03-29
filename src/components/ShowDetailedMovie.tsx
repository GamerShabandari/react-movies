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


    return (<>
        <Link to="/">Hem igen</Link>
        <div>
            {chosenMovie.Title}
            {chosenMovie.Plot}
        </div>

    </>)
}