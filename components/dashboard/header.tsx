"use client"

import { Menu, Search, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  // HANDLE USER LOGOUT
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Logged out successfully")
      router.push("/auth/login")
    } catch (error) {
      toast.error("Error logging out")
    }
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 glass-effect px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* MOBILE MENU BUTTON */}
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
      </button>

      {/* SEPARATOR */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* SEARCH */}
        <div className="relative flex flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-gray-400" />
          <Input placeholder="Search interviews, tasks..." className="pl-10 border-0 bg-white/50 backdrop-blur-sm" />
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* NOTIFICATIONS */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* LOGOUT */}
          <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
