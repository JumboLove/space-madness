import { createImageBuilder, useSanityClient } from "astro-sanity";

export const imageBuilder = createImageBuilder(useSanityClient());

export function urlForImage(source: string) {
  return imageBuilder.image(source);
}
