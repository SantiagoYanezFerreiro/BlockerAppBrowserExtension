import express from "express";
import cors from "cors";
const app = express();
const port = 5174;

app.use(express.static("public"));
app.use(cors());

app.use((req, res, next) => {
  const blockedSites = ["example.com"];
  const requestedSite = req.originalUrl;

  if (blockedSites.includes(requestedSite)) {
    return res.redirect("https://www.google.com");
  }

  next();
});

app.get("/api/data", (req, res) => {
  try {
    console.log("Received request for /api/data");
    const data = { message: "Hello from the server!" };
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.error("Error handling /api/data:", error);
    console.error("Error stack trace:", error.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
