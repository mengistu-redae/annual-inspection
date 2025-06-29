"use client"

import { GlobalNavigation } from "./global-navigation"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Search, RefreshCw } from "lucide-react"
import Link from "next/link"

interface GlobalHeaderProps {
  title?: string
  subtitle?: string
  userRole?: "citizen" | "admin" | "agent"
  userName?: string
  showSearch?: boolean
  showNotifications?: boolean
  showUserMenu?: boolean
}

export function GlobalHeader({
  title = "ቦሎ Digital",
  subtitle = "Ethiopian Vehicle Registration System",
  userRole = "citizen",
  userName,
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
}: GlobalHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-800 to-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Navigation and Logo */}
          <div className="flex items-center space-x-4">
            <GlobalNavigation userRole={userRole} userName={userName} />

            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">ቦ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">{title}</h1>
                <p className="text-xs text-blue-200">{subtitle}</p>
              </div>
            </Link>
          </div>

          {/* Center Section - Search (optional) */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vehicles, documents..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
                />
              </div>
            </div>
          )}

          {/* Right Section - Actions and User */}
          <div className="flex items-center space-x-3">
            {/* System Status Badges */}
            <div className="hidden lg:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-600 text-white border-0">
                <div className="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse" />
                System Online
              </Badge>
              <Badge variant="secondary" className="bg-blue-600 text-white border-0">
                <div className="w-2 h-2 bg-blue-300 rounded-full mr-1 animate-pulse" />
                Ethiopia Post
              </Badge>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Notifications */}
            {showNotifications && (
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  3
                </Badge>
                <span className="sr-only">Notifications</span>
              </Button>
            )}

            {/* Refresh Button */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh</span>
            </Button>

            {/* User Menu */}
            {showUserMenu && (
              <div className="flex items-center space-x-2">
                {userName ? (
                  <div className="hidden sm:flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-1">
                    <User className="h-4 w-4" />
                    <div className="text-sm">
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-blue-200 capitalize">{userRole}</p>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white hover:text-blue-800 bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
