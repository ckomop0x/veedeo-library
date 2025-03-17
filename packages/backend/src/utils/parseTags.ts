export function parseTags(tags?: string | string[]): string[] {
  if (!tags) return [];

  const tagArray = Array.isArray(tags) ? tags : tags.split(',');

  return tagArray
    .flatMap(tag => tag.split(','))
    .map(tag => tag.toLowerCase().trim())
    .filter(tag => tag.length > 0);
}
