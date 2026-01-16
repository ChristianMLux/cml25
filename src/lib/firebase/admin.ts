import "server-only";
import { getApps, initializeApp, cert, getApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const serviceAccountKey =
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || process.env.FIREBASE_PRIVATE_KEY;

if (!serviceAccountKey) {
  throw new Error(
    "FIREBASE_PRIVATE_KEY or FIREBASE_SERVICE_ACCOUNT_KEY is not defined in .env.local",
  );
}

let serviceAccount;

try {
  // Try parsing as JSON first (if user provided full object)
  if (serviceAccountKey.trim().startsWith("{")) {
    serviceAccount = JSON.parse(serviceAccountKey);
  } else {
    // Otherwise, assume it's just the private key string
    // We need to construct the object manually
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!projectId || !clientEmail) {
      throw new Error(
        "Missing FIREBASE_CLIENT_EMAIL or NEXT_PUBLIC_FIREBASE_PROJECT_ID when using raw private key.",
      );
    }

    serviceAccount = {
      projectId,
      clientEmail,
      // Handle escaped newlines if present (common in env vars)
      privateKey: serviceAccountKey.replace(/\\n/g, "\n"),
    };
  }
} catch (error) {
  console.error("Failed to parse Firebase credentials", error);
  throw new Error("Invalid Firebase Credentials configuration");
}

export const adminApp =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const adminStorage = getStorage(adminApp);
