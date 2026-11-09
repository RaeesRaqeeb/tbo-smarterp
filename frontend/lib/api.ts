const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const TOKEN_KEY = "tbo_token";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => window.localStorage.setItem(TOKEN_KEY, t),
  clear: () => window.localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = tokenStore.get();
  const headers = new Headers(init.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof URLSearchParams) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`${API}${path}`, { ...init, headers });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = typeof body.detail === "string" ? body.detail : JSON.stringify(body.detail);
    } catch {}
    throw new ApiError(res.status, detail);
  }
  return res.json() as Promise<T>;
}

export type Me = { id: number; email: string; full_name: string; role: string; permissions: string[] };

export type Series = { period: string; count: number }[];
export type GroupPerf = { name: string; products: number; sales: number; avg_days_to_sale: number | null }[];

export type Dashboard = {
  generated_at: string;
  totals: {
    total_products: number;
    videos_uploaded: number;
    videos_processed_by_ai: number;
    awaiting_review: number;
    approved: number;
    published: number;
    published_confirmed_on_fleek: number;
    sold: number;
    fast_sellers: number;
    awaiting_reposting: number;
    reposted: number;
    dead_stock: number;
    failed_publishing: number;
  };
  rates: { publishing_success_pct: number | null; ai_acceptance_pct: number | null };
  product_status_breakdown: Record<string, number>;
  performance: Record<"daily" | "weekly" | "monthly", { uploads: Series; sales: Series }>;
  category_performance: GroupPerf;
  brand_performance: GroupPerf;
};

export type TeamUser = { id: number; email: string; full_name: string; role: string; is_active: boolean };
