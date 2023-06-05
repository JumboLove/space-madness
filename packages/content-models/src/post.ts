import { defineField, defineType } from "sanity";
import { z } from "zod";
import * as S from "sanity-zod-types";

export const postSanityDefinition = defineType({
  name: "post",
  title: "Post",
  type: "document",
  initialValue: {
    __i18n_lang: "en",
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
});

export const Post = S.Document.extend({
  title: S.String,
  slug: S.Slug,
  description: S.String,
  mainImage: S.Image,
  body: z.union([z.any(), z.null()]), // TODO manage this
});

export type Post = z.infer<typeof Post>;
