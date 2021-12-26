import axios from "axios";
import config from "../config.json";

function errorHandler(callback) {
    return async function () {
        try {
            return await callback.apply(this, arguments);
        } catch (error) {
            const errors = error.response.data.errors;
            if (error.response && !errors) {
                throw new Error(error.response.data.message);
            } else if (error.response && errors) {
                throw new Error(errors[Object.keys(errors)[0]]);
            } else {
                throw new Error("Something went wrong");
            }
        }
    };
}

export default class TodoAPI {
    static axiosInstance = axios.create({
        baseURL: `${config.API_URL}/api/v1`,
        headers: {
            "Content-Type": "application/json"
        }
    });

    static getAuthOptions(JWT) {
        return { headers: { "Authorization": `Bearer ${JWT}` } };
    }

    /* POST /api/v1/auth/${action} */
    static auth = errorHandler(async function (username, password, action) {
        const body = JSON.stringify({ username, password });
        const response = await this.axiosInstance.post(`/auth/${action}`, body);

        return response.data;
    });

    /* GET /api/v1/todos */
    static getTodos = errorHandler(async function (JWT) {
        const options = this.getAuthOptions(JWT);
        const response = await this.axiosInstance.get("/todos", options);

        return response.data;
    });

    /* POST /api/v1/todos */
    static createTodo = errorHandler(async function (text, JWT) {
        const body = JSON.stringify({ text, completed: false });
        const options = this.getAuthOptions(JWT);
        const response = await this.axiosInstance.post("/todos", body, options);

        return response.data;
    });

    /* PATCH /api/v1/todos/:id */
    static updateTodo = errorHandler(async function (id, body, JWT) {
        const options = this.getAuthOptions(JWT);
        const response = await this.axiosInstance.patch(`/todos/${id}`, JSON.stringify(body), options);

        return response.data;
    });

    /* DELETE /api/v1/todos/:id */
    static deleteTodo = errorHandler(async function (id, JWT) {
        const options = this.getAuthOptions(JWT);
        const response = await this.axiosInstance.delete(`/todos/${id}`, options);

        return response.data;
    });
};

