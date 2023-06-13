export function getSanityTypeDisplayText(type: string, plural?: boolean) {
  switch (type) {
    case "post":
      return plural ? "Articles" : "Article";
    case "concept":
      return plural ? "Concepts" : "Concept";
    case "resource":
      return plural ? "Resources" : "Resource";
    case "resourceContent":
      return "Resource Content";
    case "tag":
      return plural ? "Tags" : "Tag";
    default:
      console.warn(
        `Please add a display text case for ${type} to getSanityTypeDisplayText()`
      );
      return type;
  }
}
