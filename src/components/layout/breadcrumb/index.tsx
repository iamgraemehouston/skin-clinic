"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { BreadcrumbProps, BreadcrumbItem } from "./types";
import {
  generateBreadcrumbItems,
  collapseBreadcrumbItems,
  segmentToLabel,
} from "./utils";

export default function Breadcrumb({
  customItems,
  showHome = true,
  separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
  className,
  maxItems,
  collapseFrom = "middle",
}: BreadcrumbProps) {
  const pathname = usePathname();

  let breadcrumbItems: BreadcrumbItem[] =
    customItems || generateBreadcrumbItems(pathname, showHome);

  if (maxItems && breadcrumbItems.length > maxItems) {
    breadcrumbItems = collapseBreadcrumbItems(
      breadcrumbItems,
      maxItems,
      collapseFrom
    );
  }

  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx("flex items-center space-x-2 mt-6 mb-9", className)}
    >
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => {
          const isEllipsis = item.label === "...";

          return (
            <li key={`${item.href}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className="mx-2" aria-hidden="true">
                  {separator}
                </span>
              )}

              {isEllipsis ? (
                <span className="text-gray-400 px-1">...</span>
              ) : item.isCurrentPage ? (
                <span
                  className={clsx(
                    "font-medium text-gray-900",
                    "flex items-center"
                  )}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={clsx(
                    "text-black/50 hover:text-gray-700",
                    "transition-colors duration-200 flex items-center"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export type { BreadcrumbItem, BreadcrumbProps };
export { generateBreadcrumbItems, collapseBreadcrumbItems, segmentToLabel };
