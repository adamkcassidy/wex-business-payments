import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"

import { AppLayout } from "@/components/app-layout"
import { navItems } from "@/config/nav"
import type { RouteHandle } from "@/lib/route-handle"
import { PlaceholderPage } from "@/pages/placeholder-page"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      ...navItems.map((item) => ({
        path: item.path,
        element: <PlaceholderPage title={item.title} icon={item.icon} />,
        handle: { title: item.title } satisfies RouteHandle,
      })),
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
