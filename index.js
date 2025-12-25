import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const BOT_TOKEN = "8108946436:AAF1GdOrWpyLa5eMYXFXFpiYfXwJQ9ugoWY"; 
const CHAT_ID = "5206404005";      

app.get("/", (req, res) => res.send("Backend running"));
app.post("/checkout", async (req, res) => {
  const { name, phone, address, items, total } = req.body;
  const text = `🛒 ORDER\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nItems: ${items}\nTotal: ${total}`;
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text,
      }
    );
    console.log("Telegram response:", response.data);
    res.json({ success: true });
  } catch (error) {
    console.error("Telegram error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));