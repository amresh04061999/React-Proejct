import { useEffect, useState } from "react";
import "./App.css"
import StarRating from "./StarRating";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "f84fc31d";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// Main Component
export default function App() {
  const [query, setQuery] = useState("interstellar");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(function (){
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then((res)=>res.json()).then((data)=>setMovies(data.Search))
  // },[])
  //   useEffect(function(){
  //     console.log("initial reader")
  //   },[])
  //   useEffect(function(){
  //    console.log("every render")
  //   })

  //   useEffect(function(){
  //     console.log("Update dependency ")
  //   },[query])

  // console.log("Render");
  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }
  function handlerDelete(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }
  useEffect(function () {
    const controller= new AbortController();
    async function movieGet() {
      try {
        setIsLoading(true);
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal});
        if (!res.ok) throw new Error("Something went wrong with fetching movies ")
        const data = await res.json();
        setMovies(data.Search);
        setError("")
        if (data.Response === "False") throw new error("Movie not found")
      } catch (error) {
        setError(error.message);
        if(error.name !=="AbortError" ){
          setError(error.message)
        }
      } finally {

        setIsLoading(false)
      
       }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return
    }
    HandlerClose()
    movieGet()
    return function(){
      controller.abort()
    }
  }, [query])

  function handleSelectedId(id) {
    setSelectedId(selectedId => id === selectedId ? null : id)
  }
  function HandlerClose() {
    setSelectedId(null)
  }
  return (
    <>
      <NavBar >
        <Search query={query} setQuery={setQuery} />
        <NumResults movie={movies} />
      </NavBar>
      <Main  >
        {/* passing children  */}
        {/* <Box >
         { isLoading ? <Loading/> :  <MovieLists movie={movies} />}
        </Box> */}
        <Box >
          {isLoading && <Loading />}
          {!isLoading && !error && <MovieLists movie={movies} onSelectedId={handleSelectedId} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails selectedId={selectedId} oncloseButton={HandlerClose} onAddWatched={handleAddWatched} watched={watched} /> : <>
              <Summary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handlerDelete} /></>
          }

        </Box>
        {/* passing element */}
        {/* <Box element={<MovieLists movie={movies} />}> 
          </Box>
          <Box element={<><Summary watched={watched} />
             <WatchedMoviesList watched={watched} /></>}>
          </Box> */}
      </Main>

    </>
  );
}

function Loading() {
  return <p>Loading...</p>
}
function ErrorMessage({ message }) {
  return <p>{message}</p>
}
// NavBarComponent
function NavBar({ children }) {
  return <nav className="nav-bar">
    <Logo />
    {children}
  </nav>
}

// Logo component
function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}

// Search box component
function Search({ query, setQuery }) {

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
}

// NumResults component
function NumResults({ movie }) {
  return <p className="num-results">
    Found <strong>{movie?.length}</strong> results
  </p>
}
// Main Component
function Main({ children }) {
  return <main className="main">
    {children}
  </main>

}

// Box component passing children

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen1((open) => !open)}
    >  {isOpen1 ? "–" : "+"}
    </button>
    {isOpen1 && children

    }
  </div>

}
// // Box component by passing element
// function Box({element}) {
//   const [isOpen1, setIsOpen1] = useState(true);
//   return <div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen1((open) => !open)}
//     >  {isOpen1 ? "–" : "+"}
//     </button>
//     {isOpen1 && element

//     }
//   </div>

// }

// MovieList component
function MovieLists({ movie, onSelectedId }) {

  return <ul className="list list-movies">
    {movie?.map((movie) => (
      <Movies movie={movie} key={movie.imdbID} onSelectedId={onSelectedId} />
    ))}
  </ul>
}

// Movie Component
function Movies({ movie, onSelectedId }) {
  return <li onClick={() => onSelectedId(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}

function MovieDetails({ selectedId, oncloseButton, onAddWatched, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating

  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating,
    Plot: plot, Released: released, Genre: genre, Actors: actors, Director: director } = movieDetails

  function addMovie() {
    const newWatched = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating
    }
    onAddWatched(newWatched);
    oncloseButton(null)
  }


  useEffect(function () {
    async function getMovieDetailsById() {
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await res.json();
      setMovieDetails(data)
      setIsLoading(false)
    }
    getMovieDetailsById()
  }, [selectedId])


  useEffect(function () {
    if (!title) return
    document.title = `Movie | ${title}`
    return function(){
      document.title="usePopCon";
    }
  }, [title])

  

  return <div className="details">
    {isLoading ? <Loading /> : <>
      <header>
        <div>
          <button className="btn-black" onClick={oncloseButton}>&larr;</button>

        </div>
        <img src={poster} alt={`Poster of ${movieDetails} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released}  {runtime}</p>
          <p>{genre}</p>
          <p>{imdbRating}</p>
        </div>
      </header>
      <section>
        {!isWatched ? <div className="rating">
          <StarRating maxRating={10} size={26} onSetRating={setUserRating} />
          {userRating > 0 && <button className="btn-add" onClick={addMovie}>Add to list</button>}
        </div> : <p>You give already rating {watchedUserRating}</p>}

        <p><em>{plot}</em></p>
        <p>Starring{actors}</p>
        <p>Directed by {director}</p>
      </section>
    </>
    }
  </div>
}
// WatchedMovies component

// function WatchedMovies() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);
//   return <div className="box">
//     <button
//       className="btn-toggle"
//       onClick={() => setIsOpen2((open) => !open)}
//     >
//       {isOpen2 ? "–" : "+"}
//     </button>
//     {isOpen2 && (
//       <>
//         <Summary watched={watched} />
//         <WatchedMoviesList watched={watched} />

//       </>
//     )}
//   </div>
// }

// Summary component
function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
}


// WatchedMoviesList component
function WatchedMoviesList({ watched, onDeleteWatched }) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedList movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
    ))}
  </ul>
}

// WatchedList component
function WatchedList({ movie, onDeleteWatched }) {
  return <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
      <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
    </div>
  </li>
}