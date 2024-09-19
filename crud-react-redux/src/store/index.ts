import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { UserId, UserWithId, rollbackUser } from "./users/slice";
import { toast } from 'sonner'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware : Middleware = (store) => (next) => (action) => {
  // Obtengo el state antes de actualizarlo y que pase por el store
  const { type, payload } = action as { type: string, payload: UserId }
  // Variable para rollback
  const previousState = store.getState()
  
  next(action)
  
  // Se puede hacer con todas las acciones 'slice/nombreDeAccion'
  if (type === 'users/deleteUserById') {
    const userIdToRemove = payload
    // Obtengo el user
    const userToRemove = previousState.users.find((user: UserWithId) => user.id === payload)
    fetch (`https://jsonplaceholder.typicode.casfas/${userIdToRemove}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        toast.success(`Usuario ${userIdToRemove} eliminado`)
      }
      throw new Error('Error al eliminar el usuario')
    })
    .catch((err) => {
      toast.error(`Error al eliminar usuario ${userIdToRemove}`)
      if (userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.log(err)
      console.log('Error')
    })
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(syncWithDatabaseMiddleware)
      .concat(persistanceLocalStorageMiddleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
