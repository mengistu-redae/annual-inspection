"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Menu,
  Home,
  FileText,
  Calendar,
  CreditCard,
  BarChart3,
  Users,
  Building2,
  Settings,
  Phone,
  Mail,
  MapPin,
  Package,
  Truck,
  Shield,
  Bell,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationItem {
  title: string
  href: string
  icon: React.ReactNode
  badge?: string
  description?: string
  adminOnly?: boolean
}

const citizenNavItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />,
    description: "Return to main page",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "View your vehicle information",
  },
  {
    title: "Documents",
    href: "/documents",
    icon: <FileText className="h-4 w-4" />,
    description: "Manage vehicle documents",
  },
  {
    title: "Book Appointment",
    href: "/book-appointment",
    icon: <Calendar className="h-4 w-4" />,
    description: "Schedule vehicle inspection",
  },
  {
    title: "Payments",
    href: "/payments",
    icon: <CreditCard className="h-4 w-4" />,
    description: "Pay fees and view history",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
    description: "View usage statistics",
  },
]

const adminNavItems: NavigationItem[] = [
  {
    title: "Admin Dashboard",
    href: "/admin",
    icon: <Shield className="h-4 w-4" />,
    description: "Administrative overview",
    adminOnly: true,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
    badge: "2.3K",
    description: "Manage system users",
    adminOnly: true,
  },
  {
    title: "Inspection Centers",
    href: "/admin/centers",
    icon: <Building2 className="h-4 w-4" />,
    badge: "45",
    description: "Manage inspection centers",
    adminOnly: true,
  },
  {
    title: "Payment Gateway",
    href: "/admin/payments",
    icon: <CreditCard className="h-4 w-4" />,
    description: "Payment system management",
    adminOnly: true,
  },
  {
    title: "Ethiopia Post",
    href: "/admin/post-office",
    icon: <Package className="h-4 w-4" />,
    badge: "402",
    description: "Document delivery system",
    adminOnly: true,
  },
  {
    title: "Agent Network",
    href: "/admin/agents",
    icon: <Truck className="h-4 w-4" />,
    badge: "287",
    description: "Rural agent management",
    adminOnly: true,
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
    description: "Configure system settings",
    adminOnly: true,
  },
]

interface GlobalNavigationProps {
  userRole?: "citizen" | "admin" | "agent"
  userName?: string
}

export function GlobalNavigation({ userRole = "citizen", userName }: GlobalNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationItems = userRole === "admin" ? [...citizenNavItems, ...adminNavItems] : citizenNavItems

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleNavigation = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <SheetTitle className="text-left text-white">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">ቦ</span>
              </div>
              <div>
                <h2 className="font-bold">ቦሎ Digital</h2>
                <p className="text-xs text-blue-100">Vehicle Registration System</p>
              </div>
            </div>
          </SheetTitle>
          {userName && (
            <div className="flex items-center space-x-2 mt-4 p-3 bg-white/10 rounded-lg">
              <User className="h-4 w-4" />
              <div className="text-left">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-blue-100 capitalize">{userRole} Account</p>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* System Status */}
          <div className="p-4 border-b">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">System Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">System Health</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Ethiopia Post</span>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Payment Gateway</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Operational
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Navigation</h3>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavigation}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${isActive(item.href) ? "text-blue-600" : "text-gray-500"}`}>{item.icon}</div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-3 w-3 text-gray-400" />
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={handleNavigation}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge variant="secondary" className="ml-auto">
                  3
                </Badge>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={handleNavigation}
              >
                <Package className="h-4 w-4 mr-2" />
                Track Delivery
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={handleNavigation}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Quick Payment
              </Button>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+251-11-123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>support@bolo.gov.et</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>Ministry of Transport, Addis Ababa</span>
              </div>
            </div>
          </div>

          {/* Logout */}
          {userName && (
            <>
              <Separator />
              <div className="p-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
