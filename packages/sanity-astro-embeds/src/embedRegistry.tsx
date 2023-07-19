import getYouTubeID from "get-youtube-id";
import { Spotify, Tweet, Vimeo, YouTube } from "mdx-embed";
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
      const renderProps = {} as ComponentPropsWithoutRef<typeof Tweet>;
      const tweetIdRegex = /^https?:\/\/twitter\.com\/([\w-]+\/status\/\d+)/;
      const match = urlOrId.match(tweetIdRegex);
      renderProps.tweetLink = match ? match[1] : "";
      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof Tweet>) =>
      props.tweetLink ? (
        <div className="aspect-video">
          <Tweet {...props} />
        </div>
      ) : null,
  },
  vimeo: {
    title: "Vimeo",
    regexp: /^https?:\/\/vimeo\.com/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {} as ComponentPropsWithoutRef<typeof Vimeo>;
      renderProps.vimeoId = urlOrId.replace(
        /^https?:\/\/vimeo\.com\/(\d+)$/,
        "$1",
      );
      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof Vimeo>) =>
      props.vimeoId ? (
        <div className="aspect-video">
          <Vimeo {...props} />
        </div>
      ) : null,
  },
  youTube: {
    title: "YouTube",
    regexp:
      /^https?:\/\/(?:www\.)?youtu(?:be\.com\/(?:watch\?v=|embed\/)|\.be\/)([\w\-]+)(?:$|\&|\?)/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = {} as ComponentPropsWithoutRef<typeof YouTube>;
      renderProps.youTubeId = getYouTubeID(urlOrId) || "";

      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof YouTube>) =>
      props.youTubeId ? (
        <div className="aspect-video">
          <YouTube {...props} />
        </div>
      ) : null,
  },
  spotify: {
    title: "Spotify",
    regexp:
      /^https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+/,
    getRenderProps: (urlOrId: string) => {
      const renderProps = { width: "100%" } as ComponentPropsWithoutRef<
        typeof Spotify
      >;
      const spotifyUrlRegex =
        /^https:\/\/open\.spotify\.com\/(album|track|playlist)\/([a-zA-Z0-9]+)/;
      const match = urlOrId.match(spotifyUrlRegex);

      if (match && match.length > 2) {
        renderProps.spotifyLink = `${match[1]}/${match[2]}`;
      }

      return renderProps;
    },
    render: (props: ComponentPropsWithoutRef<typeof Spotify>) =>
      props.spotifyLink ? (
        <div className="aspect-video">
          <Spotify {...props} />
        </div>
      ) : null,
  },
};

export type EmbedService = keyof typeof embedRegistry;
