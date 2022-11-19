import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import router from "./routes/index";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome to World Cup Api!" });
});
