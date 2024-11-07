import { useReducer } from "react"
import { TodoId, TodoTitle, Todo as TodoType } from "../types";
import { todoInitialState, todoReducer } from "../reducers/todos";

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, todoInitialState);

    const addTodo = ({ title }: TodoTitle) => {
        dispatch({ type: "ADD", payload: { title } })
    }

    const removeTodo = ({ id }: TodoId ) => {
        dispatch({ type: "REMOVE", payload: { id }})
    }

    const toggleCompleteTodo = ({ id, completed }: Pick<TodoType, "id" | "completed">) => {
        dispatch({ type: "TOGGLE_COMPLETE", payload: { id, completed } })
    }

    const clearCompleted = () => {
        dispatch({ type: "CLEAR_COMPLETED" })
    }

    return {
        todos,
        addTodo,
        removeTodo,
        toggleCompleteTodo,
        clearCompleted
    }
}