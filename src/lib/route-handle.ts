import type { ReactNode } from "react"
import { useMatches } from "react-router-dom"

export type RouteHandle = {
  title: string
  actions?: ReactNode
}

function isRouteHandle(handle: unknown): handle is RouteHandle {
  return typeof handle === "object" && handle !== null && "title" in handle
}

export function useRouteHandle(): RouteHandle | undefined {
  const matches = useMatches()
  return matches.map((match) => match.handle).filter(isRouteHandle).at(-1)
}
