import { embedRegistry, type EmbedService } from "./embedRegistry";

interface Props extends Record<string, any> {
  providerId: EmbedService;
}

export function ClientEmbed({ providerId, ...restProps }: Props) {
  const provider = embedRegistry[providerId];
  if (!provider) {
    return <div>No Embed Provider found</div>;
  }

  const Cmp = provider.render as React.ElementType;

  return <div>{provider && <Cmp {...restProps} />}</div>;
}
