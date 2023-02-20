import { Schema, model } from "mongoose";
import Book from "./book.js";

const orderSchema = new Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: false,
    },
    Status: {
      type: String,
      enum: ["accepted", "pending", "rejected"],
      default: "pending",
    },
    Book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    DateFrom: {
      type: Date,
      required: true,
    },
    DateTo: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "orders",
  }
);
orderSchema.pre(["find", "findOne"], function () {
  this.populate(["Book"]);
});
orderSchema.pre("save", async function (next) {
  if (!this.isModified("Status") || this.Status !== "accepted") {
    console.log("modified", this.Status);
    return next();
  }

  const book = await Book.findById(this.Book).exec();

  if (!book) {
    return next(new Error("Book not found"));
  }

  book.borrowsNb++;
  await book.save();
  next();
});

const Order = model("Order", orderSchema);
export default Order;
