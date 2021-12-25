import s from "./Todo.module.css";

export default function Todo({text, completed, id}) {
    return (
        <div className={s.todo}>
            <div className={s.text}><p>{text}</p></div>
            <div className={s.completed}>
                <input type="checkbox" name="completed" id="completed" checked={completed} />
            </div>
        </div>
    )
}