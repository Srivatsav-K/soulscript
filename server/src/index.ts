import express from "express";
import { config } from "dotenv";
import router from "./config/routes";
import configDb from "./config/database";

config();
configDb();

const app = express();
const PORT = process.env.PORT ?? 5005;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
});
