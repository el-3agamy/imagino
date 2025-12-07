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

  const formData = await req.formData();
  const imageFile = formData.get("imageFile");

  if (!(imageFile instanceof Blob)) {
    return NextResponse.json(
      { message: "imageFile is required." },
      { status: 400 }
    );
  }

  try {
    const backendResponse = await fetch(
      `${API_BASE_URL.replace(/\/$/, "")}/image/gen-img-without-background`,
      {
        method: "POST",
        headers: {
          Authorization: `${BEARER_KEY} ${token}`,
        },
        body: formData,
        cache: "no-store",
      }
    );

    const data = await backendResponse
      .json()
      .catch(() => ({ message: "Failed to parse server response" }));

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { message: "Failed to remove background" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("remove-background proxy error", error);
    return NextResponse.json(
      { message: "Unable to process request at the moment." },
      { status: 500 }
    );
  }
}
