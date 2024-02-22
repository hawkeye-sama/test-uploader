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

    // connect to database
    await connect();

    const _id = new mongoose.Types.ObjectId();

    const newFile = new UserFile({
      _id,
      filename: file?.name,
      uploadedBy: req.ip,
      filePath: `https://storage.cloud.google.com/${BUCKET_NAME}/uploads/${_id}.pdf`,
    });

    // GCP Upload by using Storage API

    const filePath = `uploads/${String(newFile._id)}.pdf`;

    const storage = new Storage({
      projectId: `${PROJECT_ID}`,
      credentials: {
        client_email: `${CLIENT_EMAIL}`,
        private_key: PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
      },
    });
    const bucket = storage.bucket(`${BUCKET_NAME}`);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file to Storage
    const blob = bucket.file(filePath);
    await blob.save(buffer);

    // Save to DB
    await newFile.save();

    return new NextResponse(JSON.stringify({ data: newFile }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
