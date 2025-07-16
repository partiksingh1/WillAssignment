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
const startKeepAlive = () => {
    setInterval(async () => {
        try {
            const response = await fetch("https://willassignment.onrender.com");
            if (response.ok) {
                console.log("Keep-alive ping successful");
            } else {
                console.warn(`⚠️ Keep-alive responded with status: ${response.status}`);
            }
        } catch (err) {
            console.error("❌ Keep-alive ping failed:", (err as Error).message);
        }
    }, 60 * 1000); // Every 1 minute
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    startKeepAlive();
});
export default app;