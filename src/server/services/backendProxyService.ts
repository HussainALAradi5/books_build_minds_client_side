import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/lib/server-api";
import { sameOrigin } from "@/lib/security";
import { TOKEN_COOKIE } from "@/lib/session";

type Context = { params: Promise<{ path: string[] }> };

export async function proxy(request: NextRequest, context: Context) {
  const method = request.method;
  if (method !== "GET" && !sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const { path } = await context.params;
  if (!path.every((part) => part !== "." && part !== ".." && /^[a-zA-Z0-9_.-]+$/.test(part))) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const upstreamPath = `/${path.join("/")}${request.nextUrl.search}`;
  try {
    const upstream = await fetch(backendUrl(upstreamPath), {
      method,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(method !== "GET" ? { "Content-Type": request.headers.get("content-type") || "application/json" } : {}),
      },
      body: method === "GET" ? undefined : await request.arrayBuffer(),
      cache: "no-store",
    });
    const contentType = upstream.headers.get("content-type") || "application/json";
    const content = await upstream.arrayBuffer();
    return new NextResponse(content, {
      status: upstream.status,
      headers: { "Content-Type": contentType, "Cache-Control": "no-store" },
    });
  } catch { return NextResponse.json({ error: "Server unavailable" }, { status: 503 }); }
}









