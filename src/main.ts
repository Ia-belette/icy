import express, { Request, Response, NextFunction } from "npm:express@4.18.2";
import { router } from "./routes/providers.ts";
import { router as searchRouter } from "./routes/search.ts";
const app = express();

const sites = [
  "http://localhost:5173",
  "https://focusedshares.com",
  "https://www.focusedshares.com",
];

app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;

  if (sites.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/", router);
app.use("/v1", searchRouter);

app.listen(8000);
