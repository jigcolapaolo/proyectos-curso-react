import { useUsers } from "../hooks/useUsers"

export function Results () {
    // React Query tambien funciona como estado global:
    // Sin necesidad de crear nuevos estados o realizar otras llamadas, los resultados
    // de users se obtienen automaticamente desde la cache de React Query.
    // Ni tampoco es necesario pasarle props
    const { users } = useUsers()

    return (
        <div>
            <h1>Results: {users.length}</h1>
        </div>
    )
}