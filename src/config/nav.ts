import {
  Building2,
  CreditCard,
  DollarSign,
  FileText,
  House,
  PieChart,
  ReceiptText,
  Settings,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  path: string
  icon: LucideIcon
}

export type NavGroup = {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Cards",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: House },
      { title: "My Wallet", path: "/wallet", icon: WalletCards },
      { title: "Cards", path: "/cards", icon: CreditCard },
      { title: "Transactions", path: "/transactions", icon: ReceiptText },
    ],
  },
  {
    label: "Bill Pay",
    items: [
      { title: "Payments", path: "/payments", icon: DollarSign },
      { title: "Suppliers", path: "/suppliers", icon: Building2 },
    ],
  },
  {
    label: "Admin",
    items: [
      { title: "Reports", path: "/reports", icon: PieChart },
      { title: "Statements", path: "/statements", icon: FileText },
      { title: "Team", path: "/team", icon: Users },
      { title: "Settings", path: "/settings", icon: Settings },
    ],
  },
]

export const navItems = navGroups.flatMap((group) => group.items)
