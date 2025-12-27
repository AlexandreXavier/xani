import type { LinkItem } from "@/types";

interface Props {
  link: LinkItem;
}

const parseUrl = (url: string, removeSubdomain = false) => {
  const cleaned = url.replace(/^https?:\/\//i, '').replace(/\/+$/g, '');

  const [rawHost, ...pathParts] = cleaned.split('/');
  let host = rawHost;

  host = host.replace(/^www\./i, '');

  if (removeSubdomain) {
    const segments = host.split('.');

    if (segments.length > 2) {
      host = segments.slice(-2).join('.');
    }
  }

  const path = pathParts.join('/');

  return path ? `${host}/${path}` : host;
};

export default function LinkCard({ link }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 w-full items-center rounded border border-skin-line
        bg-skin-card p-4 transition hover:border-skin-accent
        hover:bg-skin-card-muted focus-outline"
    >
      <img
        src={`https://www.google.com/s2/favicons?domain=${parseUrl(
          link.url,
          true
        )}&sz=128`}
        alt={`${link.name}'s favicon`}
        width={24}
        height={24}
        className="size-6 rounded-sm shrink-0"
      />
      <div className="flex flex-col gap-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-baseline">
          <h3 className="font-medium text-skin-base truncate">{link.name}</h3>
          <p className="text-sm text-skin-base opacity-60 truncate">
            {parseUrl(link.url)}
          </p>
        </div>
        {link.description && (
          <p className="text-sm text-skin-base opacity-70 line-clamp-2">
            {link.description}
          </p>
        )}
      </div>
    </a>
  );
}
