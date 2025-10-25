//Express app setup
import express from "express";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/files", fileRoutes);

export default app;
