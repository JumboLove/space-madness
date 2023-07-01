import { SanityTypeDisplayNames } from "content-models";

type SanityTypeName = keyof typeof SanityTypeDisplayNames;

export function getSanityTypeDisplayText(
  type: SanityTypeName,
  plural?: boolean
) {
  if (type in SanityTypeDisplayNames) {
    return plural
      ? SanityTypeDisplayNames[type][1]
      : SanityTypeDisplayNames[type][0];
  } else {
    console.warn(
      `Please add a display text case for ${type} to SanityTypeDisplayNames`
    );
    return type;
  }
}
