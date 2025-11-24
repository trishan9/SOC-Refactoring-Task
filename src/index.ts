import express from "express";
import bodyParser from "body-parser";
import { rootRouter } from "./routes/root.route";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
app.use(bodyParser.json());

app.use("/api", rootRouter);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
