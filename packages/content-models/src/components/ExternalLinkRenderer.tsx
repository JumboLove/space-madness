import React, { ReactNode } from "react";
import { LaunchIcon } from "@sanity/icons";

interface ExternalLinkRendererProps {
  renderDefault: (props: any) => ReactNode;
  value: {
    href: string;
  };
}

const ExternalLinkRenderer: React.FC<ExternalLinkRendererProps> = (props) => (
  <span>
    {props.renderDefault(props)}
    <a
      contentEditable={false}
      href={props.value.href}
      style={{ paddingLeft: 10, paddingRight: 5 }}
    >
      <LaunchIcon width={"0.7em"} />
    </a>
  </span>
);

export default ExternalLinkRenderer;
