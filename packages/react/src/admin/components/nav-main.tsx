import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import * as config from '@hdcms/config'
import { useMatchRoute, useNavigate } from "@tanstack/react-router"
export function NavMain(): React.JSX.Element {
  const matchRoute = useMatchRoute()
  const navigate = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="space-y-1">
          {config.menu.admin.main.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={() => navigate({ to: item.to })}
                className={cn("py-5", { 'bg-muted': matchRoute({ to: item.to, fuzzy: true }) })}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
