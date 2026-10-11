import { NextRequest, NextResponse } from "next/server";
import { sameOrigin } from "@/lib/security";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/session";

export async function logout(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.delete(TOKEN_COOKIE);
  response.cookies.delete(USER_COOKIE);
  return response;
}



