import { useEffect,useState } from "react";
import "./App.css"
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

const KEY="f84fc31d";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// Main Component
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState("")
  // useEffect(function (){
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`).then((res)=>res.json()).then((data)=>setMovies(data.Search))
  // },[])
  
  useEffect(function(){
    async function movieGet(){
      setIsLoading(true)
      const res =await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`);
      const data =await res.json();
     setMovies(data.Search);
     setIsLoading(false)

   }
   movieGet()
  },[])
  
  return (
    <>
      <NavBar >
        <Search />
        <NumResults movie={movies} />
      </NavBar>
      <Main  >
        {/* passing children  */}
        <Box >
         { isLoading ? <Loading/> :  <MovieLists movie={movies} />}
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedMoviesList watched={watched} />
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

function Loading()
{
  return <p>Loading...</p>
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
function Search() {
  const [query, setQuery] = useState("");
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
    {/* Found <strong>{movie.length}</strong> results */}
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
function MovieLists({ movie }) {

  return <ul className="list">
    {movie?.map((movie) => (
      <Movies movie={movie} key={movie.imdbID} />
    ))}
  </ul>
}

// Movie Component
function Movies({ movie }) {
  return <li>
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
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
}


// WatchedMoviesList component
function WatchedMoviesList({ watched }) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedList movie={movie} key={movie.imdbID} />
    ))}
  </ul>
}

// WatchedList component
function WatchedList({ movie }) {
  return <li >
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
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
    </div>
  </li>
}