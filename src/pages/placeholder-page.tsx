import type { LucideIcon } from "lucide-react"

type PlaceholderPageProps = {
  title: string
  icon: LucideIcon
}

export function PlaceholderPage({ title, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/20 p-10 text-center">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="max-w-sm text-sm text-muted-foreground">
          This screen hasn't been designed yet. The app shell and navigation
          are in place; feature content comes next.
        </p>
      </div>
    </div>
  )
}
