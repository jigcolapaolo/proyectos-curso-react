import { TODO_ACTION_TYPES } from "../consts";
import {
  AddPayloadAction,
  ListOfTodos,
  RemovePayloadAction,
  Todo,
  TodoAction,
  ToggleCompletePayloadAction,
} from "../types";

export const todoInitialState: ListOfTodos = [
  { id: "1", title: "Ver tutorial", completed: true },
  { id: "2", title: "Aprender React con Typescript", completed: false },
  { id: "3", title: "Aprender Next.js", completed: false },
];

const UPDATE_STATE_BY_ACTION = {
  [TODO_ACTION_TYPES.ADD_TODO]: (state: ListOfTodos, action: TodoAction) => {
    const { title } = (action as AddPayloadAction).payload;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    const newState = [...state, newTodo];

    return newState;
  },
  [TODO_ACTION_TYPES.REMOVE_TODO]: (state: ListOfTodos, action: TodoAction) => {
    const { id } = (action as RemovePayloadAction).payload;
    const newState = state.filter((todo) => todo.id !== id);
    return newState;
  },
  [TODO_ACTION_TYPES.TOGGLE_COMPLETE_TODO]: (
    state: ListOfTodos,
    action: TodoAction
  ) => {
    const { id, completed } = (action as ToggleCompletePayloadAction).payload;
    const newState = state.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    return newState;
  },
  [TODO_ACTION_TYPES.CLEAR_COMPLETED]: (state: ListOfTodos) => {
    return state.filter((todo) => !todo.completed);
  },
};

export const todoReducer = (state: ListOfTodos, action: TodoAction) => {
  const { type: actionType } = action;

  const updateState = UPDATE_STATE_BY_ACTION[actionType];

  return updateState ? updateState(state, action) : state;
};
