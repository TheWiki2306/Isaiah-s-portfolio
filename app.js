import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import MainRouter from "./src/routes/mainRouter.js";
import { contactRouter } from "./src/routes/contactRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static("public"));
app.use("/styles", express.static(path.join(__dirname, "public", "styles")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));
app.use("js", express.static(path.join(__dirname, "public", "js")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use("/api", contactRouter);
app.use("/", MainRouter);

const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
