import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { businessAccounts } from "@/config/account"

export function AccountSwitcher() {
  const { isMobile } = useSidebar()
  const [activeId, setActiveId] = useState(businessAccounts[0].id)
  const active =
    businessAccounts.find((account) => account.id === activeId) ??
    businessAccounts[0]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={active.name}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <AccountAvatar name={active.name} />
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">{active.name}</span>
                <span className="truncate text-xs">
                  Account number: {active.accountNumber}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-60"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Business accounts
            </DropdownMenuLabel>
            {businessAccounts.map((account) => (
              <DropdownMenuItem
                key={account.id}
                onSelect={() => setActiveId(account.id)}
                className="gap-2 p-2"
              >
                <AccountAvatar name={account.name} size="sm" />
                <div className="grid flex-1 leading-tight">
                  <span className="truncate">{account.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {account.accountNumber}
                  </span>
                </div>
                {account.id === active.id && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

function AccountAvatar({
  name,
  size = "default",
}: {
  name: string
  size?: "default" | "sm"
}) {
  return (
    <Avatar size={size} className="rounded-lg after:rounded-lg">
      <AvatarFallback className="rounded-lg">{name.charAt(0)}</AvatarFallback>
    </Avatar>
  )
}
