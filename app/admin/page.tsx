"use client"

import { GlobalHeader } from "@/components/global-header"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <GlobalHeader
        title="Admin Dashboard"
        subtitle="ቦሎ Digital Administration"
        userRole="admin"
        userName="Administrator"
        showSearch={true}
        showNotifications={true}
        showUserMenu={true}
      />
      <AdminDashboard />
    </div>
  )
}
