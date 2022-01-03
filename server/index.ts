import users from "./users";
import entries from "./entries";
import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 8080;

app.use(cors({
    origin: "*",
}))

app.use(express.json());

const prisma = new PrismaClient()

users(app, prisma);
entries(app, prisma);

app.listen(PORT, () => console.log(`server live on http://localhost:${PORT}`))

