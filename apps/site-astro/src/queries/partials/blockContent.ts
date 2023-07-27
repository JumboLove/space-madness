import groq from "groq";

export const blockContentQuery = groq`
body[]{
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      _type,
      showPopover,
      "internalLink": @.reference-> {
        _type,
        title,
        slug,
        description,
        url,
        _type == 'resource' => {
          "parentResource": @.parentResource -> {
            _type,
            title,
            slug,
          }
        }
      }
    }
  }
}
`;
