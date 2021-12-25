require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const cors = require("cors");

if (process.env.DEV !== "true") {
    const helmet = require("helmet");
    const xssClean = require("xss-clean");
    const rateLimit = require("express-rate-limit");

    app.set("trust proxy", 1);
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
    app.use(helmet());
    app.use(xssClean());
}

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/todos", require("./middlewares/authorize"), require("./routes/todos.routes"));

app.use(require("./middlewares/error_handler"));
app.use("*", require("./middlewares/not_found"));

async function main() {
    try {
        await connectDB();
        const PORT = process.env.PORT;
        app.listen(PORT, () => { console.log(`Server started at port ${PORT}`); });
    } catch (error) {
        console.log(error.message);
    }
}

main();