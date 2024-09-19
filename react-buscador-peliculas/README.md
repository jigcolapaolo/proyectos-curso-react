## Enunciado

Crea una aplicación para buscar películas

API a usar:

-https://www.omdbapi.com/
-API_KEY: 4287ad07

Requerimientos:

-Necesita mostrar un input para buscar la pelicula y un botón para buscar.
-Lista las películas encontradas y muestra el título, año y poster.
-El formulario debe funcionar
-Hacer el fetching de datos a la API
-Haz que las películas se muestren en un grid responsive.

Primera iteración:

-Evitar que se haga la misma búsqueda dos veces seguidas. (Resuelto con useRef)
-Haz que la búsqueda se haga automáticamente al escribir.
-Evita que se haga la búsqueda continuamente al escribir (debounce)