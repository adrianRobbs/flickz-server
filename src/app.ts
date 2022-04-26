import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.set("x-powered-by", false);

app.use(express.json({ limit: "10mb" }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.setHeader("Access-Control-Allow-Origin", origin as string);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Origin, Authorization, Content-Type, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH");
    return res.status(200).json({});
  }
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

////////////////////////////////////
/// Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

export default app;
