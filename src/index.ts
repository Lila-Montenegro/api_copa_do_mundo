import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import router from "./routes/index";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome to the World Cup Api!" });
});
