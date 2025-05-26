"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Calendar, CheckSquare, User, X, Briefcase } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Interviews", href: "/dashboard/interviews", icon: Calendar },
  { name: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
  { name: "Profile", href: "/dashboard/profile", icon: User },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto glass-effect px-6 pb-4">
      {/* HEADER */}
      <div className="flex h-16 shrink-0 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">InterviewPro</span>
        </div>

        {/* MOBILE CLOSE BUTTON */}
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* WORKSPACE SECTION */}
      <div className="space-y-4">
        <div className="px-3">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WORKSPACE</h2>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500",
                  )}
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
