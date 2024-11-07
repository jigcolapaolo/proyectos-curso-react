import { TODO_ACTION_TYPES, TODO_FILTERS } from "./consts";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type TodoId = Pick<Todo, "id">;
export type TodoTitle = Pick<Todo, "title">;
export type TodoCompleted = Pick<Todo, "completed">;

export type ListOfTodos = Todo[];

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];


// Reducer
export type ToggleCompletePayloadAction = {
  type: typeof TODO_ACTION_TYPES.TOGGLE_COMPLETE_TODO;
  payload: Pick<Todo, "id" | "completed">;
};
export type ClearPayloadAction = {
  type: typeof TODO_ACTION_TYPES.CLEAR_COMPLETED;
};

export type RemovePayloadAction = {
  type: typeof TODO_ACTION_TYPES.REMOVE_TODO;
  payload: TodoId;
};

export type AddPayloadAction = {
  type: typeof TODO_ACTION_TYPES.ADD_TODO;
  payload: TodoTitle;
};

export type TodoAction =
  | ToggleCompletePayloadAction
  | ClearPayloadAction
  | RemovePayloadAction
  | AddPayloadAction;
