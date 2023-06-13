import groq from "groq";
import { ResourceContent } from "content-models";
import { z } from "zod";

export const resourceContentQuery = groq`
  "resourceContent": *[ _type == "resourceContent" && resource._ref == ^._id && isVisible == true] | order(importance desc) {
    title,
    slug,
    description,
    url
  }
`;

const PartialResourceContent = ResourceContent.pick({
  title: true,
  slug: true,
  description: true,
  url: true,
});

export const ResoruceContentResult = z.array(PartialResourceContent).nullable();

export type ResoruceContentResult = z.infer<typeof ResoruceContentResult>;
