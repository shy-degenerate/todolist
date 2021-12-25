import React from "react";
import { useState, useEffect } from "react";
import List from "./List/List";
import Login from "./Login/Login";
import { Routes, Route } from "react-router-dom";

export default function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // TODO: interaction with api
            setTodos([{ text: "todo1", completed: false }, { text: "todo2", completed: true }]);
        }
        fetchData();
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={ <List todos={todos} /> } /> 
                <Route path="/login" element={ <Login /> } />     
            </Routes> 
        </div>
    );
}

