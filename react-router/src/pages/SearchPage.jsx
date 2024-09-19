/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

/* eslint-disable react/prop-types */
export function SearchPage({ routeParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`;

    // Ejemplo de fetching dinámico
    // fetch(`https://api.ajsdsadjasj.com/search/${routeParams.query}`)
  }, []);

  return (
    <>
      <h1>Has buscado: {routeParams.query}</h1>
    </>
  );
}
