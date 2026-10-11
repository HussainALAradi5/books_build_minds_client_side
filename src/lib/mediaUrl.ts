export const mediaUrl = (path: string): string => {
  if (!path.startsWith("/static/")) return path;
  const origin = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:5000";
  return new URL(path, origin).toString();
};
