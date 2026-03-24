export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  hasChildren: boolean;
}

// Normalized category used by UI and filters.
export interface Category {
  id: string;
  name: string;
  slug: string;
  href: string;
  hasChildren: boolean;
  description: string;
  status: "active" | "inactive";
  parentId: string | null;
  childrenCount: number;
  image?: string;
}
