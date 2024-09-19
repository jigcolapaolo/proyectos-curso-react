// import withResults from '../mocks/with-results.json'
// import withoutResults from '../mocks/no-results.json'
import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  // useMemo - Callback para que no se vuelva a crear la funcion cada vez que cambia el search
  const getMovies = useCallback(async ({ search }) => {
      if (search === previousSearch.current) return

      try {
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      } catch (e) {
        setError(e.message)
      } finally {
        // Se ejecuta tanto en el try como en el catch
        setLoading(false)
      }
  }, [])

  // useMemo
  const sortedMovies = useMemo(() => {
      if (!movies) return;
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, getMovies }
}