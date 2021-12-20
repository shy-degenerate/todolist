require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/todos", require("./middlewares/authorize"), require("./routes/todos.routes"));

app.use(require("./middlewares/error_handler"));
app.use("*", require("./middlewares/not_found"));

async function main() {
    try {
        await connectDB();

        app.listen(PORT, () => { console.log(`Server started at port ${PORT}`); });
    } catch (error) {
        console.log(error.message);
    }
}

main();