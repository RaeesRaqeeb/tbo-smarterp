import {
  BarChart3, Boxes, Brain, CheckSquare, Database, FolderTree, LayoutDashboard, Repeat, Rocket, Settings,
  Skull, TrendingUp, Upload, Users, Package, type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  permission: string;
  phase: 1 | 2 | 3 | 4 | 5 | 6;
};

export const NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: "dashboard.view", phase: 1 },
  { label: "Bulk Video Upload", href: "/upload", icon: Upload, permission: "upload.create", phase: 2 },
  { label: "Product Management", href: "/products", icon: Package, permission: "product.view", phase: 2 },
  { label: "AI Intelligence", href: "/ai", icon: Brain, permission: "product.edit", phase: 3 },
  { label: "Product Database", href: "/database", icon: Database, permission: "product.view", phase: 2 },
  { label: "Categories & Brands", href: "/taxonomy", icon: FolderTree, permission: "taxonomy.manage", phase: 2 },
  { label: "Approvals", href: "/approvals", icon: CheckSquare, permission: "product.approve", phase: 2 },
  { label: "Publishing Queue", href: "/publishing", icon: Rocket, permission: "publish.manage", phase: 4 },
  { label: "Inventory Management", href: "/inventory", icon: Boxes, permission: "inventory.view", phase: 5 },
  { label: "Reposting Centre", href: "/reposting", icon: Repeat, permission: "repost.manage", phase: 5 },
  { label: "Fast Sellers", href: "/fast-sellers", icon: TrendingUp, permission: "analytics.view", phase: 6 },
  { label: "Dead Stock", href: "/dead-stock", icon: Skull, permission: "deadstock.manage", phase: 5 },
  { label: "Sales Analytics", href: "/analytics", icon: BarChart3, permission: "analytics.view", phase: 6 },
  { label: "Team Management", href: "/team", icon: Users, permission: "users.manage", phase: 1 },
  { label: "Settings", href: "/settings", icon: Settings, permission: "settings.manage", phase: 4 },
];
