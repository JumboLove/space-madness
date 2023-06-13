import { Reference, Slug } from "sanity-zod-types";
import { LinkIcon } from "@sanity/icons";
import InternalLinkRender from "../components/InternalLinkRenderer";
import { type Rule } from "sanity";

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
        { type: "post" },
        { type: "concept" },
        { type: "resource" },
        { type: "resourceContent" },
      ],
      validation: (Rule: Rule) => Rule.required().error("Alt text is required"),
    },
    {
      name: "showPopover",
      title: "Show Popover",
      description: "Popover will show a preview of the linked content",
      type: "boolean",
      initialValue: true,
    },
  ],
};

type referenceTypes = "post" | "concept" | "resource";

interface StandardInternalLink {
  slug: Slug;
  title: string;
  _type: referenceTypes;
}

interface ResourceContentInternalLink {
  slug: Slug;
  title: string;
  _type: "resourceContent";
  resource: {
    _type: "resource";
    slug: Slug;
  };
}

export type InternalLinkAnnotation = {
  _type: "internalLink";
  reference: Reference;
  showPopover: Boolean;
  internalLink: StandardInternalLink | ResourceContentInternalLink;
};
