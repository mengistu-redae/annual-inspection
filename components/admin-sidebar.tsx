"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  BarChart3,
  Users,
  Building2,
  Calendar,
  DollarSign,
  FileText,
  UserCheck,
  MapPin,
  Download,
  AlertTriangle,
  Bell,
  Shield,
  Settings,
  Home,
} from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { id: "overview", label: "Overview", icon: Home, badge: null },
    { id: "analytics", label: "Analytics", icon: BarChart3, badge: "New" },
    { id: "users", label: "Users", icon: Users, badge: "233K" },
    { id: "centers", label: "Centers", icon: Building2, badge: "6" },
    { id: "appointments", label: "Appointments", icon: Calendar, badge: "1.2K" },
    { id: "payments", label: "Payments", icon: DollarSign, badge: "ETB 891K" },
    { id: "documents", label: "Documents", icon: FileText, badge: "89K" },
    { id: "agents", label: "Agents", icon: UserCheck, badge: "287" },
    { id: "regions", label: "Regions", icon: MapPin, badge: "5" },
    { id: "reports", label: "Reports", icon: Download, badge: null },
    { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: "3" },
    { id: "notifications", label: "Notifications", icon: Bell, badge: "15K" },
    { id: "security", label: "Security", icon: Shield, badge: "99.9%" },
    { id: "settings", label: "Settings", icon: Settings, badge: null },
  ]

  const handleItemClick = (sectionId: string) => {
    onSectionChange(sectionId)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b bg-blue-800 text-white">
            <h2 className="text-xl font-bold">ቦሎ Digital Admin</h2>
            <p className="text-blue-200 text-sm">Ethiopian Government Portal</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive ? "bg-blue-100 text-blue-800 font-medium" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge
                        variant={isActive ? "default" : "secondary"}
                        className={`text-xs ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Ministry of Transport & Logistics
              <br />
              Federal Democratic Republic of Ethiopia
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
