import { ChevronsUpDown, LogOut, Settings, UserRound } from "lucide-react"
import { Link } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { currentUser } from "@/config/account"

export function NavUser() {
  const { isMobile } = useSidebar()

  const avatar = (
    <Avatar className="rounded-lg after:rounded-lg">
      <AvatarFallback className="rounded-lg">{currentUser.initials}</AvatarFallback>
    </Avatar>
  )

  const identity = (
    <div className="grid flex-1 text-left leading-tight">
      <span className="truncate font-semibold">{currentUser.name}</span>
      <span className="truncate text-xs">{currentUser.email}</span>
    </div>
  )

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={currentUser.name}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {avatar}
              {identity}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-sm text-foreground">
                {avatar}
                {identity}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRound />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
