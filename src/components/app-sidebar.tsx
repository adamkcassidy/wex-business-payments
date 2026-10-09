import type { ComponentProps } from "react"
import { Link, useLocation } from "react-router-dom"

import wexLogo from "@/assets/wex-logo.svg"
import { AccountSwitcher } from "@/components/account-switcher"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { navGroups } from "@/config/nav"

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <Link
        to="/dashboard"
        aria-label="WEX Business Payments home"
        className="flex h-14 shrink-0 items-center gap-0.5 overflow-hidden border-b border-sidebar-border px-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0"
      >
        <img
          src={wexLogo}
          alt="WEX"
          className="h-5 w-auto shrink-0 group-data-[collapsible=icon]:hidden"
        />
        <span className="truncate text-sm font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
          Business Payments
        </span>
        <span className="hidden size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground group-data-[collapsible=icon]:flex">
          W
        </span>
      </Link>

      <SidebarHeader className="border-b border-sidebar-border">
        <AccountSwitcher />
      </SidebarHeader>

      <SidebarContent className="gap-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path} onClick={() => setOpenMobile(false)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
