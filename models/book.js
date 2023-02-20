import mongoose from "mongoose";
import Author from "./author.js";
import Category from "./category.js";
import Order from "./orderModel.js";
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    year: {
      type: String,
      required: true,
      trim: true,
    },
    Category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    image: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    Order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    borrowsNb: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["available", "pending", "borrowed"],
      default: "available",
    },
  },
  {
    collection: "books",
    timestamps: true,
  }
);

bookSchema.pre(["find", "findOne"], function () {
  this.populate(["Author", "Category", "Order"]);
});

const Book = model("Book", bookSchema);
export default Book;
