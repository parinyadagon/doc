import * as Minio from "minio";
import { minio } from "./config";

function getSubstringBeforeX(inputString: string): string {
  const indexOfX = inputString.indexOf("?X");

  if (indexOfX !== -1) {
    return inputString.substring(0, indexOfX);
  } else {
    // Return the original string if '?x' is not found
    return inputString;
  }
}

// Initialize MinIO client
const minioClient = new Minio.Client({
  endPoint: minio.endPoint,
  port: minio.port,
  // useSSL: minio.useSSL,
  useSSL: false,

  accessKey: minio.accessKey,
  secretKey: minio.secretKey,
});

// Define the default bucket name
const defaultBucketName = minio.bucketName || "";

// Function to create a bucket if it doesn't exist
async function createBucketIfNotExists(bucketName: string = defaultBucketName) {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    await minioClient.makeBucket(bucketName, "");
  }
}

// Function to upload a file and return its URL
async function uploadFile(
  filePath: string,
  objectName: string,
  bucketName: string = defaultBucketName
): Promise<string> {
  try {
    await createBucketIfNotExists(bucketName);
    await minioClient.fPutObject(bucketName, objectName, filePath);

    const objectUrl = await minioClient.presignedGetObject(
      bucketName,
      objectName
    );
    return objectUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// MinIO upload function
function uploadFileSteam(
  objectName: string,
  buffer: Buffer,
  size: number,
  mimeType: Minio.ItemBucketMetadata,
  bucketName: string = defaultBucketName
): Promise<void> {
  return new Promise((resolve, reject) => {
    minioClient.putObject(
      bucketName,
      objectName,
      buffer,
      size,
      mimeType,
      (err) => {
        if (err) {
          console.error("Error uploading to MinIO:", err);
          reject(err);
        } else {
          console.log(`File ${objectName} uploaded to MinIO`);
          resolve();
        }
      }
    );
  });
}

// Function to download a file from MinIO
async function downloadFile(
  objectName: string,
  bucketName: string = defaultBucketName
): Promise<string> {
  try {
    const filePath = `downloads/${objectName}`; // Adjust the download path as needed
    await minioClient.fGetObject(bucketName, objectName, filePath);
    return filePath;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function to delete a file from MinIO
async function deleteFile(
  objectName: string,
  bucketName: string = defaultBucketName
): Promise<void> {
  await minioClient.removeObject(bucketName, objectName);
}
async function getUrlObject(
  objectName: string,
  bucketName: string = defaultBucketName
): Promise<string> {
  try {
    const objectUrl = await minioClient.presignedGetObject(
      bucketName,
      objectName
    );
    if (minio.useSSL)
      return getSubstringBeforeX(
        objectUrl
          .replace("http", "https")
          .replace(":" + minio.port.toString(), "")
      );
    else return getSubstringBeforeX(objectUrl);
  } catch (error) {
    console.error("Error getting URL:", error);
    throw error;
  }
}

// Function to delete a file from MinIO when the object found in the bucket
async function deleteFileIfFound(
  objectName: string,
  bucketName: string = defaultBucketName
): Promise<void> {
  try {
    const exists = await minioClient.statObject(bucketName, objectName);
    if (exists) {
      await minioClient.removeObject(bucketName, objectName);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export {
  createBucketIfNotExists,
  uploadFile,
  uploadFileSteam,
  downloadFile,
  deleteFile,
  getUrlObject,
  deleteFileIfFound,
};

export type ItemBucketMetadata = Minio.ItemBucketMetadata;
