import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { User } from "../types";

export const useUsers = () => {
      // Todos estos son metodos de InfiniteQuery
  const { isLoading, isFetching, isError, data, refetch, fetchNextPage, hasNextPage } =
  useInfiniteQuery<{ nextCursor?: number; users: User[] }>(
    {
      // Todo esto se guarda globalmente en cache con esta key,
      // Lo que se obtenga en queryFn, se guarda en la variable 'data'
      queryKey: ["users"],
      queryFn: fetchUsers,
      // se puede usar document.location.query?.page para obtener cualquier dato de la url
      // Al usar fetchNextPage en un button, se ejecuta getNextPageParam, que toma el nextCursor y
      // se lo envia al fetchUsers, modificando el pageParams
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1,
      // Para que no haga fetch cada vez que la pagina recupera el focus
      refetchOnWindowFocus: false,
      // Los datos una vez obtenidos, en el DevTools aparecen como 'stale' (Viejos), por eso intentara
      // actualizarlos siempre con otro fetch al hacer focus.
      // con 'staleTime' en Infinity, los datos siempre apareceran como 'fresh' y no se actualizaran
      staleTime: Infinity,
      // Cuando falle el fetch, se reintentara en 1 segundo
      retryDelay: 1000
    },
  );

  // data contiene un array de pages, en donde tiene nextCursor y un array de users
  // flatMap deja solo un array con todos los users
  return {
    refetch,
    isFetching,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage
  }
}