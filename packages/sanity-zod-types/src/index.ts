// import { SanityDocument } from "@sanity/types";

/**
 * Used "Zodity" as a starting point
 * @see https://github.com/OllieJT/zodity
 */

import { z } from "zod";
import { stringDate } from "./utilities";

export const Boolean = z.boolean();
export const Date = stringDate;
export const Datetime = stringDate;
export const Number = z.number();
export const String = z.string();
export const Text = z.string();
export const Url = z
  .string()
  .url()
  .transform((value) => new URL(value));

export const Reference = z.object({
  _type: z.literal("reference"),
  _ref: z.string(),
});
export const Document = z.object({
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _createdAt: Datetime,
  _updatedAt: Datetime,
});

export const Slug = z.object({ _type: z.literal("slug"), current: z.string() });
export const Geopoint = z.object({
  _type: z.literal("geopoint"),
  alt: z.number(),
  lat: z.number(),
  lng: z.number(),
});

export const Image = z.object({ _type: z.literal("image"), asset: Reference });
const ImageAssetMetadataPalette = z.object({
  _type: z.literal("sanity.imagePaletteSwatch"),
  background: z.string(),
  foreground: z.string(),
  population: z.number(),
  title: z.string(),
});
export const ImageAsset = Document.extend({
  _type: z.literal("sanity.imageAsset"),
  assetId: z.string(),
  extension: z.string(),
  mimeType: z.string(),
  originalFilename: z.string(),
  path: z.string(),
  sha1hash: z.string(),
  size: z.number(),
  uploadId: z.string(),
  url: z.string().url(),
  metadata: z.object({
    _type: z.literal("sanity.imageMetadata"),
    blurHash: z.string(),
    hasAlpha: z.boolean(),
    isOpaque: z.boolean(),
    lqip: z.string(),
    dimensions: z.object({
      _type: z.literal("sanity.imageDimensions"),
      aspectRatio: z.number(),
      height: z.number(),
      width: z.number(),
    }),
    palette: z.object({
      _type: z.literal("sanity.imagePalette"),
      darkMuted: ImageAssetMetadataPalette,
      darkVibrant: ImageAssetMetadataPalette,
      dominant: ImageAssetMetadataPalette,
      lightMuted: ImageAssetMetadataPalette,
      lightVibrant: ImageAssetMetadataPalette,
      muted: ImageAssetMetadataPalette,
      vibrant: ImageAssetMetadataPalette,
    }),
  }),
});

export const File = z.object({ _type: z.literal("file"), asset: Reference });
export const FileAsset = Document.extend({
  _type: z.literal("sanity.fileAsset"),
  assetId: z.string(),
  extension: z.string(),
  mimeType: z.string(),
  originalFilename: z.string(),
  path: z.string(),
  sha1hash: z.string(),
  size: z.number(),
  uploadId: z.string(),
  url: z.string().url(),
});
