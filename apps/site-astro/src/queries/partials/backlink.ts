import { SanityBacklinkType } from "content-models";
import groq from "groq";
import * as S from "sanity-zod-types";
import { z } from "zod";

export const backlinksQuery = groq`  
  "backlinks": *[references(^._id) && isVisible == true]{ 
    title,
    _type,
    slug,
    description,
    _type == 'resourceContent' => {
      "resource": @.resource -> {
        _type,
        slug
      }
    }
  }
`;

const StandardBacklink = z.object({
  title: S.String,
  _type: SanityBacklinkType,
  slug: S.Slug,
  description: S.String,
});

// Resource Content will not have its own page
// Use the parent Resource to build a URL
const ResourceContentBacklink = z.object({
  title: S.String,
  _type: z.literal("resourceContent"),
  slug: S.Slug,
  description: S.String,
  resource: z.object({
    _type: z.literal("resource"),
    slug: S.Slug,
  }),
});

// Use a generic object structure here that is
// enough information to render a link card
export const Backlink = z.union([StandardBacklink, ResourceContentBacklink]);

export const BacklinkResult = z.array(Backlink).nullable();

export type Backlink = z.infer<typeof Backlink>;
export type BacklinkResult = z.infer<typeof BacklinkResult>;
