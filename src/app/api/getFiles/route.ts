import { NextResponse } from "next/server";
import { UserFileModel } from "../../common/models";
import { UserFile, connect } from "../mongoose";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    // connect to mongodb
    await connect();

    // get list of files
    const userFiles: Array<UserFileModel> = await UserFile.find()
      .sort({ createdAt: -1 })
      .lean();

    // return all files to client
    return NextResponse.json(
      { msg: "SUCCESS", data: userFiles },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
