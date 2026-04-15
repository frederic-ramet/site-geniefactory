import { jsonLd } from '@/lib/schema';

/**
 * Renders a schema.org JSON-LD block. Safe: the helper escapes `<` to
 * prevent breaking out of the script tag.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLd(data)}
    />
  );
}
