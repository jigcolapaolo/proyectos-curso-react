import { useState } from "react";
import { Todos } from "./components/Todos";
import { FilterValue } from "./types";
import { Footer } from "./components/Footer";
import { TODO_FILTERS } from "./consts";
import { Header } from "./components/Header";
import { useTodos } from "./hooks/useTodos";

// const mockTodos = [
//   {
//     id: "1",
//     title: "Ver tutorial",
//     completed: true,
//   },
//   {
//     id: "2",
//     title: "Aprender React con Typescript",
//     completed: false,
//   },
//   {
//     id: "3",
//     title: "Aprender Next.js",
//     completed: false,
//   },
// ];

const App: React.FC = () => {
  const { todos, addTodo, removeTodo, toggleCompleteTodo, clearCompleted } = useTodos();
  // const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL);

  // const handleRemove = ({ id }: TodoId): void => {
  //   const newTodos = todos.filter(todo => todo.id !== id);
  //   setTodos(newTodos);
  // }

  // const handleCompleted = ({ id, completed }: Pick<TodoType, "id" | "completed">): void => {
  //   const newTodos = todos.map(todo => {
  //     if (todo.id === id) {
  //       return {
  //         ...todo,
  //         completed
  //       }
  //     }
  //     return todo
  //   })

  //   setTodos(newTodos);
  // }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
  }

  // const handleRemoveAllCompleted = () => {
  //   const newTodos = todos.filter(todo => !todo.completed);
  //   setTodos(newTodos);
  // }

  // const handleAddTodo = ({ title }: TodoTitle): void => {
  //   const newTodo = {
  //     id: crypto.randomUUID(),
  //     title,
  //     completed: false
  //   }
  //   setTodos([...todos, newTodo])
  // }

  const activeCount = todos.filter(todo => !todo.completed).length

  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })


  return (
    <div className="todoapp">
      <Header
        onAddTodo={addTodo}
      />
      <Todos 
        todos={filteredTodos} 
        onRemoveTodo={removeTodo} 
        onToggleCompleteTodo={toggleCompleteTodo}
      />
      <Footer 
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected} 
        onClearCompleted={clearCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default App;
