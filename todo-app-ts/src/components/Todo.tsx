import { type Todo as TodoType } from "../types"

interface Props extends TodoType {
    onRemoveTodo: () => void
    onToggleCompleteTodo: () => void
}

export const Todo: React.FC<Props> = ({ title, completed, onRemoveTodo, onToggleCompleteTodo }) => {
    return (
        <div className="view">
            <input 
                type="checkbox" 
                checked={completed} 
                className="toggle" 
                onChange={onToggleCompleteTodo}
            />
            <label>{title}</label>
            <button className="destroy" onClick={onRemoveTodo}></button>
        </div>
    )
}