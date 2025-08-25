import slugify from "slugify";

export type CurrencyCode = string;
export type LocaleCode = string;

export type ProductIdentity = {
  id: number;
  title: string;
  category?: string;
};

export type PriceFormatter = (amount: number) => string;

export function createPriceFormatter(
  locale: LocaleCode,
  currency: CurrencyCode,
  opts: Intl.NumberFormatOptions = {
    style: "currency",
    maximumFractionDigits: 2,
  }
): PriceFormatter {
  const formatter = new Intl.NumberFormat(locale, { ...opts, currency });
  return (amount: number): string => formatter.format(amount);
}

export function formatPrice(
  amount: number,
  currency: CurrencyCode,
  locale: LocaleCode = "en-US",
  opts: Intl.NumberFormatOptions = {
    style: "currency",
    maximumFractionDigits: 2,
    currencyDisplay: "symbol",
  }
): string {
  return new Intl.NumberFormat(locale, { ...opts, currency }).format(amount);
}

export function toProductSlug({
  id,
  title,
}: ProductIdentity): `${number}-${string}` {
  const handle: string = slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });
  return `${id}-${handle}`;
}

export function toProductPath(
  identity: ProductIdentity
): `/products/${string}` {
  const slug = toProductSlug(identity);
  return identity.category
    ? `/products/${identity.category}/${slug}`
    : `/products/${slug}`;
}

export function parseProductSlug(
  slug: string
): { id: number; handle: string } | null {
  const match: RegExpMatchArray | null = slug.match(/^(\d+)-(.+)$/);
  if (!match) return null;
  const id: number = Number(match[1]);
  if (!Number.isFinite(id)) return null;
  return { id, handle: match[2] };
}
