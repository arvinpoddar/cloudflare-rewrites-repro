import { NextRequest, NextResponse } from "next/server";

const queryParam = "value";

export function GET(req: NextRequest) {
  console.log("Echo API route called, request URL:", req.nextUrl.href);

  const secret = req.nextUrl.searchParams.get(queryParam);
  if (!secret) {
    return new Response("Missing secret", { status: 400 });
  }

  const destinationUrl = new URL(req.nextUrl);
  destinationUrl.searchParams.delete(queryParam);

  return NextResponse.redirect(destinationUrl, {
    headers: new Headers({
      "x-redirect-engaged": "true",
      "x-redirect-secret": secret,
    }),
  });
}
