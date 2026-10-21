export const backendUrl = (path: string): string => {
  const base = process.env.BACKEND_URL || "http://127.0.0.1:5000";
  const apiPath = path.startsWith("/static/") ? path : `/api${path}`;
  return new URL(apiPath, base.endsWith("/") ? base : `${base}/`).toString();
};
