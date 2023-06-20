export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Split a string by its newline character (\n)
 */
export function splitIntoLines(text: string) {
  return text.split("\n").filter((line) => line.length);
}

/**
 * Generate a unique ID string
 */
export function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return timestamp + random;
}
