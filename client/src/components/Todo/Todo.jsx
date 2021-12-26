import s from "./Todo.module.css";
import TodoAPI from "../../api";
import { FaTrashAlt } from "react-icons/fa";

export default function Todo({ setTodos, text, completed, id,
    editTodo, setError, deletingMode }) {

    async function deleteTodo(id) {
        try {
            await TodoAPI.deleteTodo(id, localStorage.getItem("token"));
            const response = await TodoAPI.getTodos(localStorage.getItem("token"));
            setTodos(response.todos);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    }

    async function toggleCheckbox(id) {
        try {
            await TodoAPI.updateTodo(id, { completed: !completed }, localStorage.getItem("token"));
            const response = await TodoAPI.getTodos(localStorage.getItem("token"));
            setTodos(response.todos);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={s.todo} onClick={() => { editTodo(id); }} >
            <div className={s.text} ><p>{text}</p></div>
            <div className={s.inputs}>
                <div className={s.completed}>
                    <input type="checkbox" 
                    name="completed" 
                    id="completed" 
                    onClick={(e) => { e.stopPropagation(); }}
                    checked={completed} 
                    onChange={() => { toggleCheckbox(id); }} />
                </div>
                {deletingMode && <FaTrashAlt onClick={(e) => { e.stopPropagation(); deleteTodo(id); }} className={s.delete_icon} />}
            </div>
        </div>
    );
}