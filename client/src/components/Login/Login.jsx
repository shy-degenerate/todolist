import React from "react";
import { useState } from "react";
import s from "./Login.module.css";
import TodoAPI from "../../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [signUp, setSignUp] = useState();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await TodoAPI.auth(username, password, signUp ? "register" : "login");
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", username);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="center">
            <div className={s.login_form}>
                <div className={s.header}><h1>{signUp ? "Sign up" : "Log in"}</h1></div>
                <form onSubmit={handleSubmit} >
                    <div className={s.username}>
                        <label htmlFor="username">username</label>
                        <input className="text_input" type="text" value={username} onChange={(e) => { setUsername(e.target.value); }} />
                    </div>
                    <div className={s.password}>
                        <label htmlFor="password">password</label>
                        <input className="text_input" type="password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
                    </div>
                    <div className={s.buttons}>
                        <div className={s.login_btn}><button type="submit" className="btn">Let me in</button></div>
                        <div className={s.switch_mode_btn}>
                            <input
                                type="button"
                                className="text_btn"
                                onClick={() => { setSignUp(!signUp); }}
                                value={signUp ? "already have an account?" : "need an account for this shit?"} />
                        </div>
                    </div>
                    <div className={s.error_message}><p>{error}</p></div>
                </form>
            </div>
        </div>
    );
}