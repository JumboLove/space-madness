import { Reference, Slug } from "sanity-zod-types";
import { LinkIcon } from "@sanity/icons";
import InternalLinkRender from "../components/InternalLinkRenderer";

export const internalLinkSanityDefinition = {
  name: "internalLink",
  type: "object",
  title: "Internal link",
  icon: LinkIcon,
  components: {
    annotation: InternalLinkRender,
  },
  fields: [
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      to: [
        { type: "post" }, // TODO can I set this up to automatically register types?
      ],
    },
  ],
};

export type InternalLinkAnnotation = {
  _type: "internalLink";
  reference: Reference;
  internalLink: {
    slug: Slug;
    title: string;
    _type: "post";
  };
};
