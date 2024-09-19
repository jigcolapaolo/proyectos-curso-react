import { useMemo, useState } from "react";
import "./App.css";
import { UsersList } from "./components/UsersList";
import { SortBy, User } from "./types.d";
import { useUsers } from "./hooks/useUsers";
import { Results } from "./components/Results";



function App() {
  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  // const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  // const originalUsers = useRef<User[]>([]);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    console.log(email)
    // const filteredUsers = users.filter((user) => user.email !== email);
    // setUsers(filteredUsers);
  };

  const handleReset = () => {
    void refetch();
    // setUsers(originalUsers.current);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  // useEffect para filtrar
  // useEffect(() => {
  //   if (!filterCountry) {
  //     setUsers(originalUsers.current);
  //     return;
  //   }

  //   const debounceTimeout = setTimeout(() => {
  //     const filteredUsers = originalUsers.current.filter((user) =>
  //       user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  //     );
  //     setUsers(filteredUsers);
  //   }, 500);

  //   return () => clearTimeout(debounceTimeout);
  // }, [filterCountry]);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(false);
  //   fetchUsers(currentPage)
  //     .then((users) => {
  //       setUsers((prevUsers) => {
  //         const newUsers = prevUsers.concat(users);
  //         originalUsers.current = newUsers;
  //         return newUsers;
  //       });
  //     })
  //     .catch((err) => {
  //       setError(true);
  //       console.log(err);
  //     })
  //     .finally(() => setLoading(false));
  // }, [currentPage]);

  // Estos 2 useMemo se usan para que aunque cambie el filtro, se ordene automaticamente la lista
  // Si el sortByCountry estaba en true. Si no usara useMemo, al cambiar el showColors, se ejecutarian
  // estas funciones
  // Solo se ejecuta si cambia users o filterCountry
  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  // Solo se ejecutara la funcion al cambiar filteredUsers o sortByCountry (Cambia el sort)
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    // if (sorting === SortBy.COUNTRY) {
    //   return filteredUsers.toSorted((a, b) => {
    //     return a.location.country.localeCompare(b.location.country);
    //   })
    // }

    // if (sorting === SortBy.NAME) {
    //   return filteredUsers.toSorted((a, b) => {
    //     return a.name.first.localeCompare(b.name.first);
    //   })
    // }

    // if (sorting === SortBy.LAST) {
    //   return filteredUsers.toSorted((a, b) => {
    //     return a.name.last.localeCompare(b.name.last);
    //   })
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    // Se obtiene una funcion dependiendo del sorting y se usa una vez para cada user,
    // esta funcion retorna el valor especifico de ese user, compara los 2 valores obtenidos para cada uno
    // y los ordena
    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <Results />
      <span>Total de usuarios: {sortedUsers.length}</span>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? "No ordenar por país"
            : "Ordenar por pais"}
        </button>

        <button onClick={handleReset}>Resetear Lista</button>

        <input
          placeholder="Filtrar por pais"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        {/*Se pone asi para que no se desmonte nunca al cargar o haber error */}
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <strong>Cargando ...</strong>}
        {isError && <p>Ha habido un error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && (
          <button disabled={!hasNextPage} onClick={() => void fetchNextPage()}>
            {!hasNextPage ? "No hay mas resultados" : "Cargar más resultados"}
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
