import "dotenv/config";
import express from "express";
import cors from "cors";
import counterRouter from "./routes/CounterRoutes.js";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "counterOnline",
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World! GET /");
});
app.use("/counter", counterRouter);
//
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server listening ${port}`);
});
