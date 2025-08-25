import { BreadcrumbItem } from "./types";

export function segmentToLabel(segment: string): string {
  return segment
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bid\b/gi, "ID");
}

export function generateBreadcrumbItems(
  pathname: string,
  showHome: boolean = true
): BreadcrumbItem[] {
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");
  const items: BreadcrumbItem[] = [];

  if (showHome) {
    items.push({
      label: "Home",
      href: "/",
      isCurrentPage: pathname === "/",
    });
  }

  pathSegments.forEach((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isCurrentPage = href === pathname;

    items.push({
      label: segmentToLabel(segment),
      href,
      isCurrentPage,
    });
  });

  return items;
}

export function collapseBreadcrumbItems(
  items: BreadcrumbItem[],
  maxItems: number,
  collapseFrom: "start" | "middle" = "middle"
): BreadcrumbItem[] {
  if (items.length <= maxItems) {
    return items;
  }

  const ellipsisItem: BreadcrumbItem = {
    label: "...",
    href: "#",
    isCurrentPage: false,
  };

  if (collapseFrom === "start") {
    const keepCount = maxItems - 2;
    return [items[0], ellipsisItem, ...items.slice(-keepCount)];
  } else {
    const keepStart = Math.floor((maxItems - 3) / 2);
    const keepEnd = maxItems - keepStart - 3;

    return [
      ...items.slice(0, keepStart + 1),
      ellipsisItem,
      ...items.slice(-keepEnd - 1),
    ];
  }
}
