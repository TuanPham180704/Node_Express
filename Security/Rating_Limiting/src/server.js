import express from "express";
import helmet from "helmet";
import { globalLimited } from "./middleware/rate_limit.js";
import authRoutes from "./routers/auth.js";

const app = express();
app.use(express.json());

app.use(helmet());


app.use(globalLimited);


app.use("/api/auth", authRoutes);


app.listen(3000, () => console.log("🚀 Server chạy tại http://localhost:3000"));
