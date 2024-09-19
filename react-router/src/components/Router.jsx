import { useState, useEffect, Children } from "react"
import { EVENTS } from "../utils/const"
import { match } from "path-to-regexp"
import { getCurrentPath } from "../utils/getCurrentPath"

/* eslint-disable react/prop-types */
export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath())
  
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(getCurrentPath())
      }
  
      // Se escucha la navegacion al ir hacia adelante
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      // Se escucha la navegacion al ir hacia atras
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
      }
  
    }, [])

    let routeParams = {}

    // Añadir las rutas que vienen de los componentes CHILDREN, o sea <Route />
    // Esta es una forma de leer las props de los children
    const routesFromChildren = Children.map(children, ({ props, type }) => {
      // Revisar en el inspect
        const { name } = type
        const isRoute = name === 'Route'
        return isRoute ? props : null
    })

    const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

    const Page = routesToUse.find(({ path }) => {
        //En el dinámico, path seria /search/:query y el currentPath /search/javascript
        if (path === currentPath) return true
        // Se usa path-to-regexp
        // para poder detectar rutas dinámicas como por ejemplo
        // /search/:query <-- :query es una ruta dinámica

        // Devuelve una funcion que compara con el currentPath y si hizo match
        // Usa el path /search/:query
        // Decodifica lo que esta en la posicion de :query
        const matcherUrl = match(path, { decode: decodeURIComponent })
        // Si /search/javascript hace match, devuelve un objeto { query: 'javascript' }
        const matched = matcherUrl(currentPath)
        if (!matched) return false

        // Si lo encuentra..
        // Guarda los parámetros de la url que eran dinámicos
        // y que hemos extraído con path-to-regexp
        // por ejemplo si la ruta es /search/:query
        // y la url es /search/javascript
        // matched.params.query === 'javascript
        routeParams = matched.params // { query: 'javascript' } // /search/javascript
        return true

    })?.Component

    return Page 
    ? <Page routeParams={routeParams} /> 
    : <DefaultComponent routeParams={routeParams} />
  
  }