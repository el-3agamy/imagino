import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE_KEY } from "@/utils/Cookies.keys";
import { getServerCookies } from "@/services/ServerCookies.service";
import { proxyAssetRequest } from "./[assetId]/route";

export async function GET(req: NextRequest) {
  const assetId =
    req.nextUrl.searchParams.get("assetId") ||
    req.nextUrl.searchParams.get("assetID") ||
    req.nextUrl.searchParams.get("imageId");

  if (!assetId) {
    return NextResponse.json({ message: "assetId query parameter is required" }, { status: 400 });
  }

  const token = await getServerCookies(ACCESS_TOKEN_COOKIE_KEY);
  if (!token) {
    return NextResponse.json(
      { message: "You must be logged in to access assets." },
      { status: 401 }
    );
  }

  return proxyAssetRequest(assetId, token);
}
