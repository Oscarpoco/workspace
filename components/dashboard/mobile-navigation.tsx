"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, CheckSquare, User } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Interviews", href: "/dashboard/interviews", icon: Calendar },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="glass-effect border-t border-gray-200">
        <div className="grid grid-cols-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "mobile-nav-item flex flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-all",
                  isActive ? "text-blue-600 active" : "text-gray-500 hover:text-gray-700",
                )}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
