export const siteUrl = "https://example.com";

export const formatPhone = (phone: string) => {
  const match = phone.replace(/\D/g, "").match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!match) return phone;
  return `(${match[1]}) ${match[2]}-${match[3]}`;
};

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const isWebGLAvailable = () => {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

export const buildMailto = (email: string, subject: string) => {
  const params = new URLSearchParams({ subject });
  return `mailto:${email}?${params.toString()}`;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
