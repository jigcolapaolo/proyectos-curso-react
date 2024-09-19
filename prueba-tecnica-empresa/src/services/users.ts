export const fetchUsers = async ({ pageParam } : { pageParam: unknown }) => {
    return await fetch(
      `https://randomuser.me/api?results=10&seed=project&page=${pageParam}`
    )
      .then(async (res) => {
        console.log(res.ok, res.status, res.statusText);
        if (!res.ok) throw new Error("Error en la petición");
        return await res.json();
      })
      .then((res) => {
        const currentPage = Number(res.info.page)
        // Limitar el paginado infinito a la pagina 10
        const nextCursor = currentPage > 10 ? undefined : currentPage + 1
        return {
          users: res.results,
          nextCursor,
        };
      });
  };