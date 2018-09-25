import mongoose = require("mongoose");
import { Document, Model } from "mongoose";
import { AdminUser as AdminUserInterface } from "../interfaces/AdminUser";
import { adminUserSchema } from "../schemas/AdminUser";

export interface AdminUserModel extends AdminUserInterface, Document {}

export interface AdminUserModelStatic extends Model<AdminUserModel> {}

export const AdminUser = mongoose.model<AdminUserModel, AdminUserModelStatic>("AdminUser", adminUserSchema);

