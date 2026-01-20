export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links?: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
