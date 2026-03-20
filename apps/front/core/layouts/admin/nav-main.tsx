import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useMatchRoute, useNavigate } from "@tanstack/react-router"
import type { AdminLayoutProp } from "../AdminLayout"
export const NavMain: React.FC<AdminLayoutProp> = ({ menus }) => {
  const matchRoute = useMatchRoute()
  const navigate = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="space-y-1">
          {menus.main.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={() => navigate({ to: item.to })}
                className={cn("py-5", { 'bg-muted': matchRoute({ to: item.to, fuzzy: true }) })}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
