/*import React from 'react';
import classes from './MoviesList.module.css';
import Movie from './Movie';

const MoviesList = (props)=>{
    return (
        <ul className={classes['movies-list']}>
        {props.movies.map((movie) => (
          <Movie
            title={movie.title}
            releaseDate={movie.releaseDate}
            openingText={movie.openingText}
          />
        ))}
      </ul>
    );
}
export default MoviesList;*/
import React from 'react';
import classes from './MoviesList.module.css';
import Movie from './Movie';


const MoviesList = (props)=>{
    return (
        <ul className={classes['movies-list']}>
            {props.movies.map((movie) => (
                <Movie title={movie.title} 
                 releaseDate={movie.releaseDate}
                 openingText={movie.openingText}/>
            ))}
            
        </ul>
    );
};
export default MoviesList;
