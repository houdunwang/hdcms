import { Breadcrumb } from "#core/common/Breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "#core/theme"
import type { JSX } from "react"
export function SiteHeader(): JSX.Element {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1 mr-2" />
          <h1 className="text-base font-medium flex items-center">
            <Breadcrumb />
          </h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
