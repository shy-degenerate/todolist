import { useState } from "react";
import Todo from "../Todo/Todo";
import s from "./List.module.css";

export default function List({ todos }) {
    const [newText, setNewText] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        // TODO: interaction with api 
    }

    return (
        <>
            <div className={`center ${s.wrapper}`} >
                <div className={s.header} >
                    <div className={s.header_text} ><h1>User's list</h1></div>
                    <input type="button" className="text_btn" value="log out" />
                </div>
                <div className={s.list}>
                    <form onSubmit={handleSubmit} className={s.new_todo_form}>
                        <div className={s.text_input}>
                            <input type="text" placeholder="Add a task..." className="text_input" onChange={(e) => { setNewText(e.target.value); }} value={newText} />
                        </div>
                        <button type="submit" className="btn">Add</button>
                    </form>
                    {
                        todos.map((item) => {
                            const { text, completed, id } = item;
                            return <Todo text={text} completed={completed} key={id} />;
                        })
                    }
                </div>
            </div>
        </>
    );
}