import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/lib/server-api";
import { sameOrigin } from "@/lib/security";

export async function register(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || typeof body.user_name !== "string" || typeof body.email !== "string" || typeof body.password !== "string") {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  try {
    const upstream = await fetch(backendUrl("/register"), {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), cache: "no-store",
    });
    return NextResponse.json(await upstream.json(), { status: upstream.status });
  } catch { return NextResponse.json({ error: "Server unavailable" }, { status: 503 }); }
}



