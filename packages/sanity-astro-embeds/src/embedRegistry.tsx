import getYouTubeID from "get-youtube-id";
import { Spotify, Tweet, Vimeo, YouTube, CodePen } from "mdx-embed";
import { type ComponentPropsWithoutRef } from "react";

/**
 * Embed registry will be used to parse and validate URLs
 * You can configure how you want your component to render
 * All available MDX Embed components are listed here:
 * @see https://www.mdx-embed.com/?path=/docs/introduction--page
 */
export const embedRegistry = {
  twitter: {
    title: "Twitter",
    regexp: /^https?:\/\/twitter\.com/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {
        wrapperClass: "aspect-video",
      } as ComponentPropsWithoutRef<typeof Tweet> & {
        wrapperClass: string;
      };
      const tweetIdRegex = /^https?:\/\/twitter\.com\/([\w-]+\/status\/\d+)/;
      const match = urlOrId.match(tweetIdRegex);
      renderProps.tweetLink = match ? match[1] : "";
      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof Tweet>) =>
      props.tweetLink ? <Tweet {...props} /> : null,
  },
  vimeo: {
    title: "Vimeo",
    regexp: /^https?:\/\/vimeo\.com/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {
        wrapperClass: "aspect-video",
      } as ComponentPropsWithoutRef<typeof Vimeo> & {
        wrapperClass: string;
      };
      renderProps.vimeoId = urlOrId.replace(
        /^https?:\/\/vimeo\.com\/(\d+)$/,
        "$1",
      );
      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof Vimeo>) =>
      props.vimeoId ? <Vimeo {...props} /> : null,
  },
  youTube: {
    title: "YouTube",
    regexp:
      /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w\-]+)(?:$|\&|\?)/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {
        wrapperClass: "aspect-video",
      } as ComponentPropsWithoutRef<typeof YouTube> & {
        wrapperClass: string;
      };
      renderProps.youTubeId = getYouTubeID(urlOrId) || "";

      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof YouTube>) =>
      props.youTubeId ? <YouTube {...props} /> : null,
  },
  spotify: {
    title: "Spotify",
    regexp:
      /^https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {
        width: "100%",
        wrapperClass: "aspect-video",
      } as ComponentPropsWithoutRef<typeof Spotify> & { wrapperClass: string };
      const spotifyUrlRegex =
        /^https:\/\/open\.spotify\.com\/(album|track|playlist)\/([a-zA-Z0-9]+)/;
      const match = urlOrId.match(spotifyUrlRegex);

      if (match && match.length > 2) {
        renderProps.spotifyLink = `${match[1]}/${match[2]}`;
      }

      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof Spotify>) =>
      props.spotifyLink ? <Spotify {...props} /> : null,
  },
  codePen: {
    title: "CodePen",
    regexp: /^https?:\/\/codepen\.io\/[\w-]+\/(pen|full|details)\/[\w-]+$/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {
        wrapperClass: "aspect-video",
      } as ComponentPropsWithoutRef<typeof CodePen> & {
        wrapperClass: string;
      };
      const codePenRegex =
        /^https?:\/\/codepen\.io\/[\w-]+\/(?:pen|full|details)\/([\w-]+)$/;
      const match = urlOrId.match(codePenRegex);

      if (match && match.length > 1) {
        renderProps.codePenId = match[1];
      }
      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof CodePen>) =>
      props.codePenId ? <CodePen {...props} /> : null,
  },
};

export type EmbedService = keyof typeof embedRegistry;
