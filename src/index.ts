import express from "express";
import bodyParser from "body-parser";
import { rootRouter } from "./routes/root.route";

const app = express();
app.use(bodyParser.json());

app.use("/api", rootRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
