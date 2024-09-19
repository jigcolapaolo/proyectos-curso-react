import { useEffect, useState } from "react";

// Uso el T para indicar que no se el tipo, lo indica el usuario
export function useDebounce<T> (value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        // Detecta la ultima accion y deja que pase el tiempo del delay,
        // si no paso todavia el tiempo, y si se ingreso algo mas, se extiende el delay
        // Si termina el tiempo del delay, se limpia y se actualiza el valor
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => { clearTimeout(timer) } 
    }, [value, delay])

    return debouncedValue
}

/*
Linea de tiempo de como se comporta el usuario

En 0 ms el usuario tipea 'h',
se ejecuta el useEffect,
Pasan 150ms y el usuario tipea otra vez 'he',
se usa el clear useEffect para limpiar el timeout
y se ejecuta otra vez useEffect.
Pasan 650ms y se ejecuta el setDebouncedValue y se actualiza debouncedValue
*/
// En 0ms, el usuario tipea