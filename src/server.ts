import { createNewUser, signin } from "./handlers/users";
import { protect } from "./modules/auth";
import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.shhh_secret = "doggy";
  next();
});

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signin", signin);
export default app;
