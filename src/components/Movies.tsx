import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { IMovie } from "./models/IMovie";
import { IResponseFromApi } from "./models/IResponseFromApi";
import { ShowMovie } from "./ShowMovie";

export function Movies() {

    const [moviesFromApi, setMoviesFromApi] = useState<IMovie[]>([]);
    const [savedFavorites, setSavedFavorites] = useState<IMovie[]>([]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        let searchResultsSerialized: string = sessionStorage.getItem("searchResults") || "[]";
        let searchResultsDeSerialized: IMovie[] = JSON.parse(searchResultsSerialized)
        setMoviesFromApi([...searchResultsDeSerialized])

        let savedFavoritesSerialized: string = localStorage.getItem("myFavoriteMovies") || "[]";
        let savedFavoritesDeSerialized = JSON.parse(savedFavoritesSerialized);
        setSavedFavorites([...savedFavoritesDeSerialized])
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

    function showFavoritesHtml() {

        setShowFavorites(!showFavorites)

    }

    function deleteFavorite(indexToDelete: number) {

        let savedFavoritesSerialized: string = localStorage.getItem("myFavoriteMovies") || "[]";
        let savedFavoritesDeSerialized: IMovie[] = JSON.parse(savedFavoritesSerialized);

        savedFavoritesDeSerialized.splice(indexToDelete, 1)
        localStorage.setItem("myFavoriteMovies", JSON.stringify(savedFavoritesDeSerialized));
        setSavedFavorites([...savedFavoritesDeSerialized])

    }

    let listOfFavoritesHtml = savedFavorites.map((favorite, index) => {
        return (
            <div key={index}>
                <h6>{favorite.Title}</h6>
                <img src={favorite.Poster} alt={"poster of " + favorite.Title} width="40px" />
                <button onClick={() => { deleteFavorite(index) }}>delete favorite</button>
            </div>
        )

    })

    let listOfMoviesHtml = moviesFromApi.map((movie, index) => {

        return (
            <div key={index}>
                <ShowMovie movie={movie}></ShowMovie>
            </div>
        )
    })

    return (<>

        <section className="favoritesContainer">
            <button onClick={showFavoritesHtml}>Show favorites</button>
            <div>you have {savedFavorites.length} favorites</div>
            {showFavorites && <div>{listOfFavoritesHtml}</div>}
        </section>

        <div className="inputContainer">
            <input type="text" onChange={handleChange} value={inputText} placeholder="search movie" />
            <button onClick={searchMovie}>search</button>
        </div>

        <main className="moviesContainer">
            {isLoading && <div>Loading</div>}
            {!isLoading && listOfMoviesHtml}
        </main>

    </>)
}