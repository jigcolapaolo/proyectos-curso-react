import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect, useState, useRef, useCallback } from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacia.')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)

  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  // Cada vez que cambia search o sort, se creara un nuevo useMovies (Controlarlo)
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // DEBOUNCER
  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
  , [getMovies])


  // Gestión del formulario de manera NO CONTROLADA (A traves del DOM)
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
    // Recuperar todos los campos de los inputs con el event. Mas recomendada
    // event.preventDefault()
    // const { query } = Object.fromEntries(new window.FormData(event.target))   
    // o fields para devolver todos
    // if (query === ''){
    //   setError('No se ingresó ninguna película')
    // }
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    // Esto es asincrono, por eso declaro la variable antes
    updateSearch(newSearch)
    // DEBOUNCE, cada vez que cambia el search, se obtienen las peliculas
    debouncedGetMovies(newSearch)
  }


  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            onChange={handleChange}
            value={search}
            name='query'
            placeholder='Avengers, Star Wars, The Matrix ...' />
          <input
            type='checkbox'
            onChange={handleSort}
            checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
