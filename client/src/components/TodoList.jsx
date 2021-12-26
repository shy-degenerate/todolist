import React from "react";
import { useState, useEffect } from "react";
import List from "./List/List";
import Login from "./Login/Login";
import TodoAPI from "../api";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await TodoAPI.getTodos(localStorage.getItem("token"));
                setTodos(response.todos);
            } catch (error) {
                if (error.message === "Authorization required") {
                    navigate("/login");
                }
            }
            setIsLoading(false);
        }
        fetchData();
    }, [navigate]);

    if (isLoading) {
        return <h1>Just a moment...</h1>;
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<List todos={todos} setTodos={setTodos} />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

