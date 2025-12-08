import { NextRequest, NextResponse } from "next/server";
import { getServerCookies } from "@/services/ServerCookies.service";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/utils/Cookies.keys";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "";
const BEARER_KEY =
  process.env.NEXT_PUBLIC_BEARER_KEY || process.env.BEARER_KEY || "hamada";

export async function proxyAssetRequest(assetId: string, token: string) {
  try {
    const backendResponse = await fetch(
      `${API_BASE_URL.replace(/\/$/, "")}/image/get-image?imageId=${assetId}`,
      {
        method: "GET",
        headers: {
          Authorization: `${BEARER_KEY} ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await backendResponse
      .json()
      .catch(() => ({ message: "Failed to parse server response" }));

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { message: "Unable to fetch asset." },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("assets proxy error", error);
    return NextResponse.json(
      { message: "Unable to process request at the moment." },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ assetId?: string }> }
) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "API base URL is not configured." },
      { status: 500 }
    );
  }

  const {assetId} = await params;
  const url = new URL(req.url);
  const assetID =
    assetId ||
    url.searchParams.get("assetId") ||
    url.searchParams.get("assetID") ||
    url.searchParams.get("imageId") ||
    undefined;
  if (process.env.NODE_ENV !== "production") {
    console.debug("assets/[assetId], params assetId:", params.assetId, "query", url.searchParams.toString());
  }
  if (!assetID) {
    return NextResponse.json(
      { message: "Asset id is required" },
      { status: 400 }
    );
  }

  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  if (!token) {
    return NextResponse.json(
      { message: "You must be logged in to access assets." },
      { status: 401 }
    );
  }

  return proxyAssetRequest(assetID, token);
}
