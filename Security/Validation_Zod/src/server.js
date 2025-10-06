import express from "express";
import userRoutes from "../routers/user.js";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

app.listen(3000, () => console.log("🚀 Server running at port 3000"));
