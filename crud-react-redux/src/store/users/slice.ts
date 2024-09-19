import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE: UserWithId[] = [
  {
    id: "1",
    name: "Kryslona Bryndowin",
    email: "krys@gmail.com",
    github: "kryssy",
  },
  {
    id: "2",
    name: "Jirakka Kannaht",
    email: "jk@gmail.com",
    github: "red",
  },
  {
    id: "3",
    name: "Jergus Betwanhe",
    email: "jerg@gmail.com",
    github: "jigcolapaolo",
  },
];

export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

// En una aplicacion real, no tiene que tener valores inicialmente
// Immediately invoked function expression (IIFE)
const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux__state__");
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
        const id = crypto.randomUUID()
        // En vez de declarar que se usa el estado anterior y lo que se agrega
        state.push({ id, ...action.payload })
        // return [ ...state, { id, ...action.payload }]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      // Si encuentra al user en el state, no lo agrega
      const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);
      if (!isUserAlreadyDefined) {
        // En vez de declarar que se usa el estado anterior y lo que se agrega
        state.push(action.payload)
        // return [ ...state, action.payload ]
      }
    }
  },
});

export default usersSlice.reducer;

// En vez de poner REDUX: 'DELETE_USER_BY_ID'
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
