import groq from "groq";

export const blockContentQuery = groq`
body[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "internalLink": @.reference-> {
        slug,
        title,
        _type,
        showPopover,
        _type == 'resourceContent' => {
          "resource": @.resource -> {
            _type,
            slug
          }
        }
      }
    }
  }
}
`;
