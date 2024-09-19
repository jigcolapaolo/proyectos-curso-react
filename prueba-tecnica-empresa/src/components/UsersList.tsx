import { SortBy, User } from "../types.d";

interface Props {
  users: User[];
  showColors: boolean;
  deleteUser: (email: string) => void;
  changeSorting: (sort: SortBy) => void
}

export function UsersList({ changeSorting, deleteUser, showColors, users }: Props) {
  return (
    <table className={showColors ? 'table--showColors' : ''} width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th onClick={() => changeSorting(SortBy.NAME)} style={{ cursor: 'pointer' }}>Nombre</th>
          <th onClick={() => changeSorting(SortBy.LAST)} style={{ cursor: 'pointer' }}>Apellido</th>
          <th onClick={() => changeSorting(SortBy.COUNTRY)} style={{ cursor: 'pointer' }}>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Borrar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
