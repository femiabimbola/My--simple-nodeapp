import Express from "express";
import parser from "body-parser";
import morgan from "morgan";
import expressValidator from "express-validator";
import cors from "cors";
import env from "dotenv";
import routes from "./routes/indexRoute";

env.config();

const app = new Express();
const port = process.env.PORT || 4000;

// Using express middleware

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(morgan("dev"));

// Using 3rd party middleware
app.use(cors("*"));

app.get("/", (req, res) => {
  res.status(200).json({ status: " welcome to trip default route" });
});

app.use("/api/v1", routes);

app.use("*", (req, res) => {
  res.status(404).json({ status: "error", error: "No page is here, sorry!" });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

export default app;
