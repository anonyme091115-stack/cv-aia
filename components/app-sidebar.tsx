"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  LayoutDashboard,
  Bot,
  Sun,
  Moon,
} from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  {
    label: "Mes CVs",
    href: "/app",
    icon: LayoutDashboard,
  },
  {
    label: "Agent IA",
    href: "/app/agent",
    icon: Bot,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Link href="/app" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-sidebar-primary" />
          <span className="text-lg font-bold font-[var(--font-display)] text-sidebar-foreground">
            CV.AI
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/app" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {theme === "dark" ? "Mode clair" : "Mode sombre"}
        </Button>
      </div>
    </aside>
  )
}
