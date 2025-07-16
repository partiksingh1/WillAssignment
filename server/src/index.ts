import express from "express";
import router from "./pdfGenerator";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}))
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Export the app for testing or further configuration
export default app;