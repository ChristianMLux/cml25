import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase/admin";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `projects/uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(filename);

    await fileRef.save(buffer, {
      contentType: file.type,
      public: true, // Make the file publicly accessible
    });

    // Determine the public URL
    // For default buckets: https://storage.googleapis.com/BUCKET_NAME/FILE_PATH
    // Or valid signed URL, but public is easier for portfolio
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 },
    );
  }
}
