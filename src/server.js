import express from "express";
import authRoutes from "./Routes/auth.routes.js";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
})