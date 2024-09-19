import PropTypes from 'prop-types';


function ListOfMovies({ movies }) {
    return (
        <ul className='movies'>
            {
                movies.map(movie => (
                    <li className='movie' key={movie.id}>
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} alt={movie.itle} />
                    </li>
                ))
            }
        </ul>
    )
}

function NoMoviesResults() {
    return (
        <p>No se encontraron películas.</p>
    )
}

export function Movies({ movies }) {
    const hasMovies = movies?.length > 0

    return (
        hasMovies
            ? <ListOfMovies movies={movies} />
            : <NoMoviesResults />
    )
}

Movies.propTypes = {
    movies: PropTypes.array.isRequired // movies debe ser un array y es obligatorio
};

ListOfMovies.propTypes = {
    movies: PropTypes.array.isRequired
}