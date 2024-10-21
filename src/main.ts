import express from "npm:express@4.18.2";
import { router } from "./routes/providers.ts";
const app = express();

app.use("/", router);

app.listen(8000);
