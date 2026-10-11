import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/lib/server-api";
import { cookieOptions, sameOrigin } from "@/lib/security";
import { TOKEN_COOKIE, USER_COOKIE } from "@/lib/session";

export async function login(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.user_name_or_email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }
  try {
    const upstream = await fetch(backendUrl("/login"), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), cache: "no-store",
    });
    const data = await upstream.json();
    if (!upstream.ok) return NextResponse.json(data, { status: upstream.status });
    const response = NextResponse.json({ message: data.message, user_id: data.user_id });
    response.cookies.set(TOKEN_COOKIE, data.token, cookieOptions);
    response.cookies.set(USER_COOKIE, String(data.user_id), cookieOptions);
    return response;
  } catch { return NextResponse.json({ error: "Server unavailable" }, { status: 503 }); }
}



