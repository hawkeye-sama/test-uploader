import { Storage } from "@google-cloud/storage";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { UserFile, connect } from "../mongoose";

export const POST = async (req: NextRequest) => {
  try {
    // Get file from post data
    const data = await req.formData();
    const file = data.get("pdf") as File;

    if (!file || typeof file === "string") {
      throw new Error("pdf file not found");
    }

    const { CLIENT_EMAIL, PRIVATE_KEY, PROJECT_ID, BUCKET_NAME } = process.env;

    // Save filename to database
    await connect();

    const _id = new mongoose.Types.ObjectId();

    const newFile = new UserFile({
      _id,
      filename: file?.name,
      uploadedBy: req.ip,
      filePath: `https://storage.cloud.google.com/${BUCKET_NAME}/uploads/${_id}.pdf`,
    });

    await newFile.save();

    // GCP Upload by using Storage API

    const filePath = `uploads/${String(newFile._id)}.pdf`;

    const storage = new Storage({
      projectId: `${PROJECT_ID}`,
      credentials: {
        client_email: `${CLIENT_EMAIL}`,
        private_key: `${PRIVATE_KEY}`,
      },
    });
    const bucket = storage.bucket(`${BUCKET_NAME}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Wrap the upload logic in a promise
    await new Promise((resolve, reject) => {
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });

      blobStream
        .on("error", (err) => reject(err))
        .on("finish", () => resolve(true));

      blobStream.end(buffer);
    });

    return new NextResponse(JSON.stringify({ data: newFile }));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
