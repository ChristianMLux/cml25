import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./firebase";
import { UserProfile } from "@/types";

export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
}

export async function createUserProfile(user: User): Promise<UserProfile> {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const existingData = userSnap.data() as UserProfile;
    // Update last login
    const updatedData = {
      ...existingData,
      lastLoginAt: new Date().toISOString(),
      // Ensure role is up to date with env whitelist if applicable
      role: ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")
        ? "admin"
        : existingData.role || "user",
    };

    // Only write if changed
    if (
      existingData.role !== updatedData.role ||
      existingData.lastLoginAt !== updatedData.lastLoginAt
    ) {
      await setDoc(userRef, updatedData, { merge: true });
    }

    return updatedData;
  }

  // Create new profile
  const role = ADMIN_EMAILS.includes(user.email?.toLowerCase() || "")
    ? "admin"
    : "user";

  const newProfile: UserProfile = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    role,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  await setDoc(userRef, newProfile);
  return newProfile;
}

export async function checkAdminStatus(user: User | null): Promise<boolean> {
  if (!user) return false;

  // 1. Check Env Whitelist (Fastest & most secure for bootstrapping)
  if (user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
    return true;
  }

  // 2. Check Firestore Profile
  try {
    const profile = await getUserProfile(user.uid);
    return profile?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
