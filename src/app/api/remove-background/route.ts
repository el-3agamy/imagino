import { NextRequest, NextResponse } from "next/server";
import { getServerCookies } from "@/services/ServerCookies.service";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/utils/Cookies.keys";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";
const BEARER_KEY =
  process.env.NEXT_PUBLIC_BEARER_KEY || process.env.BEARER_KEY || "hamada";

export async function POST(req: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 }
    );
  }

  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  if (!token) {
    return NextResponse.json(
      { message: "You must be logged in to process images." },
      { status: 401 }
    );
  }

  if (!req.body) {
    return NextResponse.json(
      { message: "No file data received in request body." },
      { status: 400 }
    );
  }

  const backendUrl = `${API_BASE_URL.replace(/\/$/, "")}/image/gen-img-without-background`;
  const headers = new Headers(req.headers);
  headers.set("Authorization", `${BEARER_KEY} ${token}`);
  headers.set("cache-control", "no-store");
  headers.delete("content-length");

  try {
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      headers,
      body: req.body,
      duplex: "half",
    });

    const text = await backendResponse.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (parseError) {
      data = { message: text || "Failed to parse server response" };
    }

    if (!backendResponse.ok) {
      return NextResponse.json(
        (data as Record<string, unknown>) || { message: "Failed to remove background" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data ?? {}, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to process request at the moment.";
    console.error("remove-background proxy error", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}
