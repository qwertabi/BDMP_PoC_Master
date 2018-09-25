import { Schema } from "mongoose";

export var adminUserSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now },
  name: String,
  userName: String,
  password: String
});
