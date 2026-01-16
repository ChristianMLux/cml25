import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing Project ID" },
        { status: 400 },
      );
    }

    // Save to Firestore
    // We use setDoc with merge: true to allow partial updates (e.g. just toggling visibility)
    // or overwrite if it's a fresh publish.
    await setDoc(doc(db, "projects", id), data, { merge: true });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Firestore Save Error:", error);
    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "projects"));
    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
