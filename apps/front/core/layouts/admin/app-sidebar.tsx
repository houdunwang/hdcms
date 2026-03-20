import * as React from "react"

import { NavMain } from "#core/layouts/admin/nav-main"
import { NavUser } from "#core/layouts/admin/nav-user"
import { NavSecondary } from "#core/components/nav-secondary"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { app } from '../../../config/app'
import { Link } from "@tanstack/react-router"
import type { AdminLayoutProp } from "../AdminLayout"

export const AppSidebar: React.FC<AdminLayoutProp & React.ComponentProps<typeof Sidebar>> = (props) => {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!" >
              <Link to="/admin">
                {app.logo}
                <span className="text-base font-semibold">{app.appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain {...props} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary className="mt-auto" {...props} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
