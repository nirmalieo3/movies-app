import React, {useState, useEffect, useCallback} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App(props) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
   const fetchMoviesHandler= useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try{
     // const response = await fetch('https://swapi.py4e.com/api/films/');
     const response = await fetch('https://react-http-31052-default-rtdb.europe-west1.firebasedatabase.app/movies.json')
      if(!response.ok){
        throw new Error('something went wrong!');
      }
      const data = await response.json();
      const loadedMovies = [];
       for (const key in data){
         loadedMovies.push({
           id:key,
           title: data[key].title,
           openingText:data[key].openingText,
           releaseDate: data[key].releaseDate,
         })
       }
    /*  const transformedMovies = data.results.map(movieData=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setMovies(transformedMovies);*/
      setMovies(loadedMovies);
      
    } catch (error){
       setError(error.message);
    }
    setIsLoading(false);
  }, []);
   
  useEffect(()=>{
    fetchMoviesHandler();
 }, [fetchMoviesHandler]);

 async function addMovieHandler (movie){
  const response = await fetch('https://react-http-31052-default-rtdb.europe-west1.firebasedatabase.app/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-type': 'aplication/json'
      }
    });
    const data = await response.json();
    console.log(data);
 }

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      
      <section>
      <h1 align="center">Movie List</h1>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
