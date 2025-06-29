"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  Users,
  Building2,
  Shield,
  Calendar,
  CreditCard,
  FileText,
  Bell,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  User,
  MessageSquare,
} from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SMSNotificationSystem } from "@/components/sms-notification-system"
import { AgentNetworkDashboard } from "@/components/agent-network-dashboard"
import { MultiFactorAuth } from "@/components/multi-factor-auth"
import { getTranslation, type Language } from "@/lib/i18n"

export default function DashboardPage() {
  const [userType, setUserType] = useState("citizen")
  const [language, setLanguage] = useState<Language>("en")

  const citizenStats = [
    { title: "Active Vehicles", value: "2", icon: Car, color: "text-blue-600" },
    { title: "Pending Renewals", value: "1", icon: AlertCircle, color: "text-orange-600" },
    { title: "Completed This Year", value: "1", icon: CheckCircle, color: "text-green-600" },
    { title: "Next Inspection", value: "45 days", icon: Clock, color: "text-purple-600" },
  ]

  const inspectionCenterStats = [
    { title: "Today's Appointments", value: "24", icon: Calendar, color: "text-blue-600" },
    { title: "Completed Inspections", value: "18", icon: CheckCircle, color: "text-green-600" },
    { title: "Pending Inspections", value: "6", icon: Clock, color: "text-orange-600" },
    { title: "Monthly Revenue", value: "₹45,200", icon: CreditCard, color: "text-purple-600" },
  ]

  const authorityStats = [
    { title: "Total Registrations", value: "1,247", icon: FileText, color: "text-blue-600" },
    { title: "Active Centers", value: "23", icon: Building2, color: "text-green-600" },
    { title: "Revenue Collected", value: "₹2.4M", icon: CreditCard, color: "text-purple-600" },
    { title: "Compliance Rate", value: "94%", icon: BarChart3, color: "text-orange-600" },
  ]

  const insuranceStats = [
    { title: "Active Policies", value: "3,456", icon: Shield, color: "text-blue-600" },
    { title: "Renewals This Month", value: "234", icon: CheckCircle, color: "text-green-600" },
    { title: "Pending Verifications", value: "12", icon: Clock, color: "text-orange-600" },
    { title: "Premium Collected", value: "₹890K", icon: CreditCard, color: "text-purple-600" },
  ]

  const getStats = () => {
    switch (userType) {
      case "citizen":
        return citizenStats
      case "inspection":
        return inspectionCenterStats
      case "authority":
        return authorityStats
      case "insurance":
        return insuranceStats
      default:
        return citizenStats
    }
  }

  const recentActivities = {
    citizen: [
      { action: "Vehicle inspection completed", vehicle: "ET-1234-AA", date: "2024-01-15", status: "success" },
      { action: "Insurance renewed", vehicle: "ET-5678-BB", date: "2024-01-10", status: "success" },
      { action: "Road use fee paid", vehicle: "ET-1234-AA", date: "2024-01-08", status: "success" },
      { action: "Appointment booked", vehicle: "ET-5678-BB", date: "2024-01-05", status: "pending" },
    ],
    inspection: [
      { action: "Inspection completed - Pass", vehicle: "ET-9876-CC", date: "2024-01-15", status: "success" },
      { action: "Inspection completed - Fail", vehicle: "ET-5432-DD", date: "2024-01-15", status: "error" },
      { action: "Appointment confirmed", vehicle: "ET-1111-EE", date: "2024-01-14", status: "pending" },
      { action: "Payment received", vehicle: "ET-2222-FF", date: "2024-01-14", status: "success" },
    ],
    authority: [
      { action: "Registration renewed", vehicle: "ET-3333-GG", date: "2024-01-15", status: "success" },
      { action: "New center approved", vehicle: "Addis Inspection Hub", date: "2024-01-12", status: "success" },
      { action: "Compliance audit completed", vehicle: "Bahir Dar Center", date: "2024-01-10", status: "success" },
      { action: "Revenue report generated", vehicle: "Monthly Report", date: "2024-01-08", status: "success" },
    ],
    insurance: [
      { action: "Policy renewed", vehicle: "ET-4444-HH", date: "2024-01-15", status: "success" },
      { action: "Claim processed", vehicle: "ET-5555-II", date: "2024-01-14", status: "success" },
      { action: "Verification completed", vehicle: "ET-6666-JJ", date: "2024-01-12", status: "success" },
      { action: "Premium collected", vehicle: "ET-7777-KK", date: "2024-01-10", status: "success" },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">ቦሎ Digital</span>
              </Link>
              <Badge variant="outline">{getTranslation("dashboard", language)}</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher currentLanguage={language} onLanguageChange={(lang) => setLanguage(lang as Language)} />
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                {getTranslation("notifications", language) || "Notifications"}
              </Button>
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Type Selection */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <Tabs value={userType} onValueChange={setUserType} className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="citizen" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Vehicle Owner</span>
              </TabsTrigger>
              <TabsTrigger value="inspection" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Inspection Center</span>
              </TabsTrigger>
              <TabsTrigger value="authority" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Transport Authority</span>
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Insurance Company</span>
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>SMS Center</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Agent Network</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
            </TabsList>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {getStats().map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Content for each user type */}
            <TabsContent value="citizen" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Vehicles</CardTitle>
                      <CardDescription>Manage your registered vehicles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Car className="h-8 w-8 text-blue-600" />
                          <div>
                            <p className="font-medium">Toyota Corolla - ET-1234-AA</p>
                            <p className="text-sm text-gray-600">Next inspection: March 15, 2024</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Car className="h-8 w-8 text-orange-600" />
                          <div>
                            <p className="font-medium">Hyundai Elantra - ET-5678-BB</p>
                            <p className="text-sm text-gray-600">Inspection overdue</p>
                          </div>
                        </div>
                        <Badge variant="destructive">Overdue</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <Link href="/book-appointment">
                          <Button className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Inspection
                          </Button>
                        </Link>
                        <Link href="/payments">
                          <Button variant="outline" className="w-full bg-transparent">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Fees
                          </Button>
                        </Link>
                        <Link href="/documents">
                          <Button variant="outline" className="w-full bg-transparent">
                            <FileText className="h-4 w-4 mr-2" />
                            View Documents
                          </Button>
                        </Link>
                        <Link href="/notifications">
                          <Button variant="outline" className="w-full bg-transparent">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.citizen.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                activity.status === "success"
                                  ? "bg-green-500"
                                  : activity.status === "error"
                                    ? "bg-red-500"
                                    : "bg-yellow-500"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{activity.action}</p>
                              <p className="text-xs text-gray-600">{activity.vehicle}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inspection" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Schedule</CardTitle>
                      <CardDescription>Manage inspection appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { time: "09:00", vehicle: "ET-1111-AA", owner: "Abebe Kebede", status: "completed" },
                          { time: "10:30", vehicle: "ET-2222-BB", owner: "Almaz Tadesse", status: "in-progress" },
                          { time: "14:00", vehicle: "ET-3333-CC", owner: "Dawit Haile", status: "scheduled" },
                          { time: "15:30", vehicle: "ET-4444-DD", owner: "Hanan Ahmed", status: "scheduled" },
                        ].map((appointment, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="text-center">
                                <p className="font-medium">{appointment.time}</p>
                              </div>
                              <div>
                                <p className="font-medium">{appointment.vehicle}</p>
                                <p className="text-sm text-gray-600">{appointment.owner}</p>
                              </div>
                            </div>
                            <Badge
                              variant={
                                appointment.status === "completed"
                                  ? "default"
                                  : appointment.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Center Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">Addis Ababa, Bole District</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">+251-11-123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">info@bolecenter.et</span>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="authority" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>System Overview</CardTitle>
                    <CardDescription>Platform performance and compliance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Registration Completion Rate</span>
                          <span>94%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Digital Payment Adoption</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Center Utilization</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Financial performance tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">Registration Fees</span>
                        <span className="font-bold text-blue-600">₹1.2M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Service Charges</span>
                        <span className="font-bold text-green-600">₹800K</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="text-sm font-medium">Penalty Collections</span>
                        <span className="font-bold text-purple-600">₹400K</span>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Policy Management</CardTitle>
                      <CardDescription>Active insurance policies and renewals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            policy: "POL-2024-001",
                            vehicle: "ET-1234-AA",
                            owner: "Abebe Kebede",
                            expiry: "2024-06-15",
                            status: "active",
                          },
                          {
                            policy: "POL-2024-002",
                            vehicle: "ET-5678-BB",
                            owner: "Almaz Tadesse",
                            expiry: "2024-03-20",
                            status: "expiring",
                          },
                          {
                            policy: "POL-2024-003",
                            vehicle: "ET-9012-CC",
                            owner: "Dawit Haile",
                            expiry: "2024-08-10",
                            status: "active",
                          },
                          {
                            policy: "POL-2024-004",
                            vehicle: "ET-3456-DD",
                            owner: "Hanan Ahmed",
                            expiry: "2024-02-28",
                            status: "expired",
                          },
                        ].map((policy, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{policy.policy}</p>
                              <p className="text-sm text-gray-600">
                                {policy.vehicle} - {policy.owner}
                              </p>
                              <p className="text-xs text-gray-500">Expires: {policy.expiry}</p>
                            </div>
                            <Badge
                              variant={
                                policy.status === "active"
                                  ? "default"
                                  : policy.status === "expiring"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {policy.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full">
                        <Shield className="h-4 w-4 mr-2" />
                        New Policy
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify Claims
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Reports
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Bell className="h-4 w-4 mr-2" />
                        Send Reminders
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sms" className="mt-8">
              <SMSNotificationSystem />
            </TabsContent>

            <TabsContent value="agents" className="mt-8">
              <AgentNetworkDashboard />
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <MultiFactorAuth />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
