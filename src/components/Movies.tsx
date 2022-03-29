import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IMovie } from "./models/IMovie";
import { IResponseFromApi } from "./models/IResponseFromApi";
import { ShowMovie } from "./ShowMovie";

export function Movies() {

    const [moviesFromApi, setMoviesFromApi] = useState<IMovie[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        let searchResultsSerialized: string = sessionStorage.getItem("searchResults") || "[]";
        let searchResultsDeSerialized: IMovie[] = JSON.parse(searchResultsSerialized)
        setMoviesFromApi([...searchResultsDeSerialized])
    }, [])

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
    }

    function searchMovie() {
    
        setIsLoading(true)
        let filmArray: IMovie[] = [];

        axios.get<IResponseFromApi>("https://www.omdbapi.com/?apikey=5ed1c386&s=" + inputText + "&type=movie")
            .then(response => {

                for (let i = 0; i < response.data.Search.length; i++) {
                    const film = response.data.Search[i];
                    filmArray.push(film);

                }
                setMoviesFromApi([...filmArray])
                setIsLoading(false)
                sessionStorage.setItem("searchResults", JSON.stringify(filmArray));
            })
            .catch(error => {
                alert("to many results, try another searchterm")
            })
    }


    let listOfMoviesHtml = moviesFromApi.map((movie, index) => {

        return (
            <div key={index}>
                <ShowMovie movie={movie}></ShowMovie>
            </div>
        )
    })

    return (<>
        
        

        <input type="text" onChange={handleChange} value={inputText} placeholder="search movie" />
        <button onClick={searchMovie}>search</button>

        
        <div>amount of movies in array: {moviesFromApi.length}</div>

        {isLoading && <div>Loading</div> }
        {!isLoading && listOfMoviesHtml}
    </>)
}