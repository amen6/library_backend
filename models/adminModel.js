import { Schema, model } from "mongoose";

const AdminSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const Admin = model("Admin", AdminSchema);
export default Admin;
