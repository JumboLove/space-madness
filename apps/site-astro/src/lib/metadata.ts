export const siteTitle = "Space Madness Stack";
export const siteTagline = "Connected content with ease";
export const siteDescription =
  "A content framework that connects ideas so you can build your digital garden ";
export const hostname =
  process.env.NODE_ENV === "production"
    ? "https://demo.spacemadness.dev/"
    : "https://localhost:3000/";

export function titleTemplate(title?: string, tagline: string = siteTagline) {
  const pieces: string[] = [siteTitle, tagline];
  if (title) {
    pieces.unshift(title);
  }
  return pieces.join(" | ");
}

export function getPublicAssetUrl(assetPath: string) {
  return `${hostname}${assetPath}`;
}
