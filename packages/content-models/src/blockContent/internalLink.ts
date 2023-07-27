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
      to: [{ type: "post" }, { type: "concept" }, { type: "resource" }],
      validation: (Rule: Rule) =>
        Rule.required().error("Reference is required"),
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
  _type: referenceTypes;
  title: string;
  slug: Slug;
  description: string;
}

interface InternalLinkWithParent {
  _type: "resource";
  title: string;
  slug: Slug;
  description: string;
  url?: string;
  parentResource: {
    _type: "resource";
    title: string;
    slug: Slug;
  };
}

export type InternalLinkAnnotation = {
  _type: "internalLink";
  showPopover: Boolean;
  internalLink: StandardInternalLink | InternalLinkWithParent;
};
