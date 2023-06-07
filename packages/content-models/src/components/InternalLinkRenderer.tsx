import React, { ReactNode } from "react";
import { LinkIcon } from "@sanity/icons";

interface InternalLinkRendererProps {
  renderDefault: (props: any) => ReactNode;
}

const ExternalLinkRenderer: React.FC<InternalLinkRendererProps> = (props) => (
  <span>
    {props.renderDefault(props)}
    <span style={{ paddingLeft: 10, paddingRight: 5 }}>
      <LinkIcon width={"0.7em"} />
    </span>
  </span>
);

export default ExternalLinkRenderer;
