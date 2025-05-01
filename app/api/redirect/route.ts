import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  console.log("Redirect API called, request URL:", req.nextUrl.href);

  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret) {
    return new Response("Missing secret", { status: 400 });
  }

  const destinationUrl = new URL(req.nextUrl);
  destinationUrl.searchParams.delete("secret");

  return NextResponse.redirect(destinationUrl, {
    headers: new Headers({
      "x-redirect-engaged": "true",
      "x-redirect-secret": secret,
    }),
  });
}
