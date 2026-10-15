export const openCheckout = (url: string) => {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !(parsed.hostname === "tap.company" || parsed.hostname.endsWith(".tap.company")) || Boolean(parsed.username || parsed.password)) throw new Error("Invalid checkout address.");
  window.location.assign(parsed.href);
};
