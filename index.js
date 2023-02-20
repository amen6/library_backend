import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import connectDb from "./config/connectDb.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import bookRouter from "./routes/book.js";
import categoryRouter from "./routes/category.js";
import authorRouter from "./routes/author.js";

dotenv.config();
connectDb();

const PORT = process.env.PORT || 3002;
const app = new express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/imagesUpload", express.static("imagesUpload"));
app.use("/order", orderRouter);
app.use("/admin", adminRouter);
app.use("/api/book", bookRouter);
app.use("/category", categoryRouter);
app.use("/author", authorRouter);

app.get("/", (req, res) => {
  res.send("Api is running....");
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);
