// Update these as the defaults for your site (TODO update copy)
export const siteTitle = "Space Madness Stack";
export const siteTagline = "Connected Content with ease";
export const siteDescription =
  "Combining the best of Sanity and Astro to create deeply connected content sites";
export const hostname =
  process.env.NODE_ENV === "production"
    ? "https://demo.spacemadness.dev"
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
