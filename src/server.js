import 'dotenv/config';
import express from "express";
import authRouter from "./sprint1/Routes/auth.routes.js";
import userRouter from "./sprint2/Routes/user.routes.js";
import taskRouter from "./sprint2/Routes/task.routes.js";
import "./sprint1/models/associations.js"; 
import { connectToDatabase, sequelize } from "./sprint1/db/dbConect.js";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api", taskRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Pelmene Project API");
});

const start = async () => {
    try {
        await connectToDatabase();
        await import("./sprint1/models/user.model.js"); 
        await sequelize.sync(); 
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Startup error:", error);
    }
}
start();