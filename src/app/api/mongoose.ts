import mongoose from "mongoose";
import { UserFileModel } from "../common/models";

mongoose.Promise = global.Promise;

export async function connect() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("Unable to find MONGODB URI");
  }

  return mongoose.connect(MONGODB_URI);
}

const userFileModel = new mongoose.Schema<UserFileModel>(
  {
    filename: { type: String, required: true },
    uploadedBy: { type: String, index: true },
    filePath: { type: String, required: true },
  },
  { timestamps: true, autoCreate: false },
);

export const UserFile =
  mongoose.models.UserFile ||
  mongoose.model<UserFileModel>("UserFile", userFileModel);
