import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SantimpaySdk from "../nodeSDK/lib/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

const merchantId = process.env.MERCHANT_ID;
const privateKey = process.env.PRIVATE_KEY;
const successRedirectUrl = "https://santimpay.com";
const failureRedirectUrl = "https://santimpay.com";
const cancelRedirectUrl = "https://santimpay.com";
const notifyUrl = process.env.notifyUrl;

const id = Math.floor(Math.random() * 1000000000).toString();

const client = new SantimpaySdk(merchantId, privateKey);

app.post("/api/pay", async (req, res) => {
  try {
    const amount = Number(req.body.amount);

    const paymentId = Date.now().toString();

    const paymentUrl = await client.generatePaymentUrl(
      paymentId,
      amount,
      "Donation",
      successRedirectUrl,
      failureRedirectUrl,
      notifyUrl,
      "+251927913363",
      cancelRedirectUrl
    );
    return res.json({ paymentUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal service error" });
  }
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
