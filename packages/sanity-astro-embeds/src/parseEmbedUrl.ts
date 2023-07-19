import { embedRegistry, type EmbedService } from "./embedRegistry";

export function parseEmbedUrl(url: string) {
  const providerKeys = Object.keys(embedRegistry) as EmbedService[];

  for (const key of providerKeys) {
    const provider = embedRegistry[key];
    if (provider.regexp.test(url)) {
      return { provider, id: key };
    }
  }

  return null;
}
