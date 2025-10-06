import express from "express";
import helmet from "helmet";
import userRoutes from "../routers/user.js";

const app = express();
app.use(express.json());

app.use(helmet());

app.disable("x-powered-by");

app.use("/api", userRoutes);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
