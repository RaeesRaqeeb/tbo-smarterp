// Inventory lifecycle indicators (Module 13) — reusable in tables, details, dashboards, queues, reports.
export type Indicator =
  | "fast_seller" | "active" | "repost_required" | "second_cycle" | "dead_stock" | "sold_closed";

const MAP: Record<Indicator, { label: string; cls: string }> = {
  fast_seller: { label: "Fast Seller", cls: "bg-ind-fast/10 text-ind-fast ring-ind-fast/30" },
  active: { label: "Active Inventory", cls: "bg-ind-active/10 text-ind-active ring-ind-active/30" },
  repost_required: { label: "Repost Required", cls: "bg-ind-repost/15 text-yellow-700 ring-ind-repost/40" },
  second_cycle: { label: "Second Cycle", cls: "bg-ind-second/10 text-ind-second ring-ind-second/30" },
  dead_stock: { label: "Dead Stock", cls: "bg-ind-dead/10 text-ind-dead ring-ind-dead/30" },
  sold_closed: { label: "Sold / Closed", cls: "bg-ind-closed/10 text-ind-closed ring-ind-closed/30" },
};

export function IndicatorBadge({ indicator }: { indicator: Indicator }) {
  const m = MAP[indicator];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${m.cls}`}>
      {m.label}
    </span>
  );
}
