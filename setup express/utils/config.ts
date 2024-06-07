import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const port = process.env.PORT || 3000;

export const minio = {
  port: parseInt(process.env.MINIO_API_PORT || "9000"),
  endPoint: process.env.MINIO_API_URL || "localhost",
  useSSL: process.env.MINIO_USE_SSL === "false" ? false : true || false,
  accessKey: process.env.MINIO_API_KEY || "",
  secretKey: process.env.MINIO_API_SECRET || "",
  bucketName: process.env.MINIO_BUCKET_NAME,
};

export const DB = {};

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY || "",
  expiresIn: process.env.JWT_EXPIRES_IN || "1h",
};

export const line = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};
