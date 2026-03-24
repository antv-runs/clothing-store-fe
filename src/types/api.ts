export interface ApiPaginationLinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ApiPaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: ApiPaginationLinkItem[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface ApiPaginationLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

export interface ApiListResponse<T> {
  data: T[];
  links: ApiPaginationLinks;
  meta: ApiPaginationMeta;
  success: boolean;
  message: string;
}

export interface ApiItemResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
