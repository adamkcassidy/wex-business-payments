import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useRouteHandle } from "@/lib/route-handle"

export function AppLayout() {
  const handle = useRouteHandle()

  useEffect(() => {
    document.title = handle?.title
      ? `${handle.title} · WEX Business Payments`
      : "WEX Business Payments"
  }, [handle?.title])

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <SiteHeader />
          <div className="flex flex-1 flex-col p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
