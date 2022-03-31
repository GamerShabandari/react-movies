import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                setInputText("")
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
            <div className="favoriteItem" key={index}>
                <Link to={"/details/" + favorite.Title}>
                    <img src={favorite.Poster} alt={"poster of " + favorite.Title} width="40px" />
                    <h6>{favorite.Title}</h6>
                </Link>
                <button className="deleteBtn" onClick={() => { deleteFavorite(index) }}>X</button>
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
        <div className="container">
            <button className="favoritesBtn" onClick={showFavoritesHtml}>{savedFavorites.length}</button>
            {showFavorites && savedFavorites.length > 0 && <section className="favoritesContainer">
                <div className="favorites">{listOfFavoritesHtml}</div>
            </section>}

            <div className="inputContainer">
                <input type="text" onChange={handleChange} value={inputText} placeholder="search movie" />
                <button className="inputBtn" onClick={searchMovie}>search</button>
            </div>

            <main className="moviesContainer">
                {isLoading && <div className="loading">Loading...</div>}
                {!isLoading && listOfMoviesHtml}
            </main>
        </div>


    </>)
}