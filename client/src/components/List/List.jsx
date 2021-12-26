import { useState } from "react";
import Todo from "../Todo/Todo";
import s from "./List.module.css";
import TodoAPI from "../../api";
import { useNavigate } from "react-router-dom";

export default function List({ todos, setTodos }) {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // for adding new
    const [prevNewText, setPrevNewText] = useState("");
    const [newText, setNewText] = useState("");

    // for edit mode 
    const [editMode, setEditMode] = useState(false);
    const [currentTodoID, setCurrentTodoID] = useState();

    const [deletingMode, setDeletingMode] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (editMode && prevNewText !== newText) {
                await TodoAPI.updateTodo(currentTodoID, { text: newText }, localStorage.getItem("token"));
            } else if (!editMode) {
                await TodoAPI.createTodo(newText, localStorage.getItem("token"));
            }
            const response = await TodoAPI.getTodos(localStorage.getItem("token"));
            setTodos(response.todos);
            setError("");
        } catch (error) {
            if (error.message === "Authorization required") {
                navigate("/login");
            } else {
                setError(error.message);
            }
        }

        setEditMode(false);
        setNewText("");
    }

    function editTodo(id) {
        setEditMode(true);
        setCurrentTodoID(id);
        const todo = todos.find((item) => item.id === id);
        setPrevNewText(todo.text);
        setNewText(todo.text);
    }

    function toggleDeletingMode(e) {
        e.preventDefault();
        setDeletingMode(!deletingMode);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setTodos([]);
        navigate("/login");
    }

    return (
        <>
            <div className={`center ${s.wrapper}`} >
                <div className={s.header} >
                    <div className={s.header_text} ><h1>{`${localStorage.getItem("username")}'s list`}</h1></div>
                    <input type="button" className="text_btn" value="log out" onClick={logout} />
                </div>
                <div className={s.list}>
                    <div className={s.error_message}><p>{error}</p></div>
                    <form onSubmit={handleSubmit} className={s.new_todo_form}>
                        <div className={s.text_input}>
                            <input type="text"
                                placeholder="Add a task..."
                                className="text_input"
                                onChange={(e) => { setNewText(e.target.value); }}
                                value={newText} />
                        </div>
                        <button type="submit" className="btn">{editMode ? "Edit" : "Add"}</button>
                        <div className={s.delete_button} ><button className="btn" onClick={toggleDeletingMode}>Delete</button></div>
                    </form>
                    <div className={s.todos}>
                        {
                            todos.map((item) => {
                                const { text, completed, id } = item;
                                return <Todo editTodo={editTodo}
                                    setTodos={setTodos}
                                    setError={setError}
                                    text={text}
                                    editMode={editMode}
                                    completed={completed}
                                    key={id}
                                    deletingMode={deletingMode}
                                    id={id} />;
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}