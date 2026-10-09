import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouteHandle } from "@/lib/route-handle"

export function SiteHeader() {
  const handle = useRouteHandle()
  const title = handle?.title ?? "WEX Business Payments"

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b bg-muted/60 px-4 backdrop-blur supports-backdrop-filter:bg-muted/50">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="-ml-1 size-7" />
        <h1 className="truncate text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">{handle?.actions}</div>
    </header>
  )
}
