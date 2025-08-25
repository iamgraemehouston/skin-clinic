export type BreadcrumbItem = {
  label: string;
  href: string;
  isCurrentPage?: boolean;
};

export type BreadcrumbProps = {
  customItems?: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactElement;
  className?: string;
  maxItems?: number;
  collapseFrom?: "start" | "middle";
};
