import groq from "groq";
import { z } from "zod";
import * as S from "sanity-zod-types";

export const backlinksQuery = groq`  
  "backlinks": *[references(^._id) && isVisible == true]{ 
    title,
    _type,
    slug,
    description,
    _type == 'resource' => {
      "parentResource": @.parentResource -> {
        slug,
      }
    }
  }
`;

const BaseBacklink = z.object({
  title: S.String,
  slug: S.Slug,
  description: S.String,
});

const StandardBacklink = BaseBacklink.extend({
  _type: z.union([z.literal("concept"), z.literal("post"), z.literal("tag")]),
});

const ResourceBacklink = BaseBacklink.extend({
  _type: z.literal("resource"),
  parentResource: z
    .object({
      slug: S.Slug,
    })
    .nullable(),
});

// Use a generic object structure here that is
// enough information to render a link card
export const Backlink = z.union([StandardBacklink, ResourceBacklink]);

export const BacklinkResult = z.array(Backlink).nullable();

export type Backlink = z.infer<typeof Backlink>;
export type ResourceBacklink = z.infer<typeof ResourceBacklink>;
export type BacklinkResult = z.infer<typeof BacklinkResult>;
