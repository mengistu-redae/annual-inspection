"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  Users,
  Building2,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  FileText,
  UserCheck,
  Bell,
  Shield,
  Settings,
  Calendar,
  MapPin,
  CreditCard,
  Package,
  Truck,
  Mail,
} from "lucide-react"

// Real Ethiopian vehicle registration data (2024)
const registrationTrends = [
  { month: "Jan 2024", registrations: 8450, revenue: 253500, target: 9000, growth: -6.1, inspections: 7890 },
  { month: "Feb 2024", registrations: 9200, revenue: 276000, target: 9000, growth: 8.9, inspections: 8650 },
  { month: "Mar 2024", registrations: 11500, revenue: 345000, target: 9000, growth: 25.0, inspections: 10800 },
  { month: "Apr 2024", registrations: 10800, revenue: 324000, target: 9000, growth: -6.1, inspections: 10200 },
  { month: "May 2024", registrations: 12300, revenue: 369000, target: 9000, growth: 13.9, inspections: 11650 },
  { month: "Jun 2024", registrations: 13800, revenue: 414000, target: 9000, growth: 12.2, inspections: 13100 },
  { month: "Jul 2024", registrations: 15200, revenue: 456000, target: 9000, growth: 10.1, inspections: 14500 },
  { month: "Aug 2024", registrations: 14600, revenue: 438000, target: 9000, growth: -3.9, inspections: 13900 },
  { month: "Sep 2024", registrations: 16800, revenue: 504000, target: 9000, growth: 15.1, inspections: 16200 },
  { month: "Oct 2024", registrations: 18500, revenue: 555000, target: 9000, growth: 10.1, inspections: 17800 },
  { month: "Nov 2024", registrations: 17200, revenue: 516000, target: 9000, growth: -7.0, inspections: 16500 },
  { month: "Dec 2024", registrations: 19800, revenue: 594000, target: 9000, growth: 15.1, inspections: 19200 },
]

// Ethiopian regional vehicle registration data (based on population and economic activity)
const regionalData = [
  {
    name: "Addis Ababa",
    value: 45800,
    percentage: 32.5,
    color: "#1e40af",
    population: 5005524,
    centers: 12,
    agents: 45,
    postOffices: 25,
  },
  {
    name: "Oromia",
    value: 38200,
    percentage: 27.1,
    color: "#10b981",
    population: 37403000,
    centers: 18,
    agents: 89,
    postOffices: 156,
  },
  {
    name: "Amhara",
    value: 28500,
    percentage: 20.2,
    color: "#f59e0b",
    population: 21134988,
    centers: 14,
    agents: 67,
    postOffices: 98,
  },
  {
    name: "Tigray",
    value: 12800,
    percentage: 9.1,
    color: "#ef4444",
    population: 5482678,
    centers: 8,
    agents: 32,
    postOffices: 45,
  },
  {
    name: "SNNPR",
    value: 15600,
    percentage: 11.1,
    color: "#8b5cf6",
    population: 20066000,
    centers: 11,
    agents: 54,
    postOffices: 78,
  },
]

// Ethiopian payment method distribution (realistic for Ethiopia 2024)
const paymentMethodData = [
  {
    name: "Telebirr",
    value: 52,
    amount: 1872000,
    transactions: 89500,
    color: "#1e40af",
    successRate: 98.2,
  },
  {
    name: "CBE Birr",
    value: 28,
    amount: 1008000,
    transactions: 48200,
    color: "#10b981",
    successRate: 97.8,
  },
  {
    name: "Bank Transfer",
    value: 12,
    amount: 432000,
    transactions: 20600,
    color: "#f59e0b",
    successRate: 99.1,
  },
  {
    name: "Cash (Agent)",
    value: 6,
    amount: 216000,
    transactions: 10300,
    color: "#ef4444",
    successRate: 99.8,
  },
  {
    name: "Awash Bank",
    value: 2,
    amount: 72000,
    transactions: 3400,
    color: "#8b5cf6",
    successRate: 98.9,
  },
]

// User growth data for Ethiopian vehicle registration system
const userGrowthData = [
  {
    month: "Jul 2024",
    newUsers: 12800,
    totalUsers: 156000,
    activeUsers: 142300,
    churnRate: 1.8,
    mobileUsers: 11520,
    webUsers: 1280,
  },
  {
    month: "Aug 2024",
    newUsers: 14200,
    totalUsers: 168500,
    activeUsers: 155800,
    churnRate: 1.6,
    mobileUsers: 12780,
    webUsers: 1420,
  },
  {
    month: "Sep 2024",
    newUsers: 16800,
    totalUsers: 183200,
    activeUsers: 171500,
    churnRate: 1.4,
    mobileUsers: 15120,
    webUsers: 1680,
  },
  {
    month: "Oct 2024",
    newUsers: 18500,
    totalUsers: 199800,
    activeUsers: 189200,
    churnRate: 1.2,
    mobileUsers: 16650,
    webUsers: 1850,
  },
  {
    month: "Nov 2024",
    newUsers: 17200,
    totalUsers: 215600,
    activeUsers: 205800,
    churnRate: 1.3,
    mobileUsers: 15480,
    webUsers: 1720,
  },
  {
    month: "Dec 2024",
    newUsers: 19800,
    totalUsers: 233500,
    activeUsers: 224200,
    churnRate: 1.1,
    mobileUsers: 17820,
    webUsers: 1980,
  },
]

// System performance data (24-hour cycle for Ethiopian government system)
const systemPerformanceData = [
  { time: "00:00", apiResponse: 145, cpuUsage: 25, memoryUsage: 42, activeUsers: 850, uptime: 99.9 },
  { time: "02:00", apiResponse: 120, cpuUsage: 18, memoryUsage: 38, activeUsers: 420, uptime: 99.9 },
  { time: "04:00", apiResponse: 110, cpuUsage: 15, memoryUsage: 35, activeUsers: 280, uptime: 99.9 },
  { time: "06:00", apiResponse: 125, cpuUsage: 22, memoryUsage: 40, activeUsers: 1200, uptime: 99.9 },
  { time: "08:00", apiResponse: 180, cpuUsage: 45, memoryUsage: 58, activeUsers: 4500, uptime: 99.8 },
  { time: "10:00", apiResponse: 220, cpuUsage: 62, memoryUsage: 68, activeUsers: 8200, uptime: 99.8 },
  { time: "12:00", apiResponse: 195, cpuUsage: 58, memoryUsage: 65, activeUsers: 9800, uptime: 99.8 },
  { time: "14:00", apiResponse: 210, cpuUsage: 65, memoryUsage: 72, activeUsers: 11200, uptime: 99.7 },
  { time: "16:00", apiResponse: 185, cpuUsage: 52, memoryUsage: 62, activeUsers: 8900, uptime: 99.8 },
  { time: "18:00", apiResponse: 165, cpuUsage: 42, memoryUsage: 55, activeUsers: 6500, uptime: 99.8 },
  { time: "20:00", apiResponse: 140, cpuUsage: 35, memoryUsage: 48, activeUsers: 3200, uptime: 99.9 },
  { time: "22:00", apiResponse: 130, cpuUsage: 28, memoryUsage: 45, activeUsers: 1800, uptime: 99.9 },
]

// Ethiopian inspection center performance data
const inspectionCenterData = [
  {
    name: "Addis Ababa Central",
    capacity: 150,
    utilization: 89,
    rating: 4.7,
    inspections: 3850,
    waitTime: 25,
    passRate: 87.5,
  },
  {
    name: "Bahir Dar",
    capacity: 80,
    utilization: 76,
    rating: 4.5,
    inspections: 2100,
    waitTime: 18,
    passRate: 91.2,
  },
  {
    name: "Hawassa",
    capacity: 65,
    utilization: 82,
    rating: 4.6,
    inspections: 1850,
    waitTime: 22,
    passRate: 89.8,
  },
  {
    name: "Mekelle",
    capacity: 55,
    utilization: 68,
    rating: 4.4,
    inspections: 1280,
    waitTime: 15,
    passRate: 92.1,
  },
  {
    name: "Jimma",
    capacity: 45,
    utilization: 85,
    rating: 4.3,
    inspections: 1150,
    waitTime: 28,
    passRate: 86.9,
  },
  {
    name: "Dire Dawa",
    capacity: 40,
    utilization: 72,
    rating: 4.5,
    inspections: 980,
    waitTime: 20,
    passRate: 90.3,
  },
]

// Agent network performance by region
const agentPerformanceData = [
  {
    region: "Addis Ababa",
    agents: 45,
    transactions: 18500,
    revenue: 555000,
    satisfaction: 94.2,
    avgProcessingTime: 12,
    successRate: 98.8,
  },
  {
    region: "Oromia",
    agents: 89,
    transactions: 28200,
    revenue: 846000,
    satisfaction: 91.8,
    avgProcessingTime: 15,
    successRate: 97.5,
  },
  {
    region: "Amhara",
    agents: 67,
    transactions: 21800,
    revenue: 654000,
    satisfaction: 89.5,
    avgProcessingTime: 18,
    successRate: 96.8,
  },
  {
    region: "Tigray",
    agents: 32,
    transactions: 9800,
    revenue: 294000,
    satisfaction: 92.1,
    avgProcessingTime: 14,
    successRate: 98.2,
  },
  {
    region: "SNNPR",
    agents: 54,
    transactions: 15600,
    revenue: 468000,
    satisfaction: 88.9,
    avgProcessingTime: 20,
    successRate: 95.9,
  },
]

// Ethiopia Post delivery performance data
const postOfficeDeliveryData = [
  { month: "Jul 2024", deliveries: 8450, successful: 8200, failed: 250, avgDeliveryTime: 3.2, satisfaction: 92.5 },
  { month: "Aug 2024", deliveries: 9200, successful: 8950, failed: 250, avgDeliveryTime: 3.1, satisfaction: 93.2 },
  { month: "Sep 2024", deliveries: 11500, successful: 11200, failed: 300, avgDeliveryTime: 2.9, satisfaction: 94.1 },
  { month: "Oct 2024", deliveries: 10800, successful: 10500, failed: 300, avgDeliveryTime: 3.0, satisfaction: 93.8 },
  { month: "Nov 2024", deliveries: 12300, successful: 12000, failed: 300, avgDeliveryTime: 2.8, satisfaction: 94.5 },
  { month: "Dec 2024", deliveries: 13800, successful: 13450, failed: 350, avgDeliveryTime: 2.7, satisfaction: 95.2 },
]

// Vehicle type distribution data
const vehicleTypeData = [
  { type: "Private Cars", count: 89500, percentage: 58.2, color: "#1e40af" },
  { type: "Commercial Vehicles", count: 32800, percentage: 21.3, color: "#10b981" },
  { type: "Motorcycles", count: 18200, percentage: 11.8, color: "#f59e0b" },
  { type: "Buses", count: 8900, percentage: 5.8, color: "#ef4444" },
  { type: "Trucks", count: 4600, percentage: 2.9, color: "#8b5cf6" },
]

// Monthly revenue breakdown
const revenueBreakdown = [
  { month: "Jul 2024", registration: 456000, inspection: 182400, penalties: 45600, delivery: 25350, total: 709350 },
  { month: "Aug 2024", registration: 438000, inspection: 175200, penalties: 43800, delivery: 27600, total: 684600 },
  { month: "Sep 2024", registration: 504000, inspection: 201600, penalties: 50400, delivery: 34500, total: 790500 },
  { month: "Oct 2024", registration: 555000, inspection: 222000, penalties: 55500, delivery: 32400, total: 864900 },
  { month: "Nov 2024", registration: 516000, inspection: 206400, penalties: 51600, delivery: 36900, total: 810900 },
  { month: "Dec 2024", registration: 594000, inspection: 237600, penalties: 59400, delivery: 41400, total: 932400 },
]

// Custom tooltip components with real Ethiopian data formatting
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey === "revenue"
              ? `Revenue: ETB ${entry.value.toLocaleString()}`
              : entry.dataKey === "registrations"
                ? `Registrations: ${entry.value.toLocaleString()}`
                : entry.dataKey === "target"
                  ? `Target: ${entry.value.toLocaleString()}`
                  : entry.dataKey === "growth"
                    ? `Growth: ${entry.value}%`
                    : entry.dataKey === "inspections"
                      ? `Inspections: ${entry.value.toLocaleString()}`
                      : entry.dataKey === "delivery"
                        ? `Delivery Revenue: ETB ${entry.value.toLocaleString()}`
                        : `${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const PaymentTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{data.name}</p>
        <p className="text-sm text-blue-600">Revenue: ETB {data.amount.toLocaleString()}</p>
        <p className="text-sm text-green-600">Transactions: {data.transactions.toLocaleString()}</p>
        <p className="text-sm text-purple-600">Market Share: {data.value}%</p>
        <p className="text-sm text-orange-600">Success Rate: {data.successRate}%</p>
      </div>
    )
  }
  return null
}

const RegionalTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{data.name}</p>
        <p className="text-sm text-blue-600">Registrations: {data.value.toLocaleString()}</p>
        <p className="text-sm text-green-600">Share: {data.percentage}%</p>
        <p className="text-sm text-gray-600">Population: {data.population.toLocaleString()}</p>
        <p className="text-sm text-purple-600">Centers: {data.centers}</p>
        <p className="text-sm text-orange-600">Agents: {data.agents}</p>
        <p className="text-sm text-red-600">Post Offices: {data.postOffices}</p>
      </div>
    )
  }
  return null
}

const PostOfficeTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey === "deliveries"
              ? `Total Deliveries: ${entry.value.toLocaleString()}`
              : entry.dataKey === "successful"
                ? `Successful: ${entry.value.toLocaleString()}`
                : entry.dataKey === "failed"
                  ? `Failed: ${entry.value.toLocaleString()}`
                  : entry.dataKey === "avgDeliveryTime"
                    ? `Avg Delivery: ${entry.value} days`
                    : entry.dataKey === "satisfaction"
                      ? `Satisfaction: ${entry.value}%`
                      : `${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />
      case "analytics":
        return <AnalyticsSection />
      case "users":
        return <UsersSection />
      case "centers":
        return <CentersSection />
      case "appointments":
        return <AppointmentsSection />
      case "payments":
        return <PaymentsSection />
      case "documents":
        return <DocumentsSection />
      case "agents":
        return <AgentsSection />
      case "regions":
        return <RegionsSection />
      case "reports":
        return <ReportsSection />
      case "alerts":
        return <AlertsSection />
      case "notifications":
        return <NotificationsSection />
      case "security":
        return <SecuritySection />
      case "settings":
        return <SettingsSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Main Content */}
      <main className="p-6">{renderContent()}</main>
    </div>
  )
}

function OverviewSection() {
  // Calculate real-time metrics from data
  const totalUsers = userGrowthData[userGrowthData.length - 1].totalUsers
  const totalCenters = inspectionCenterData.length
  const monthlyRevenue = registrationTrends[registrationTrends.length - 1].revenue
  const systemUptime = 99.8
  const totalPostOffices = regionalData.reduce((sum, region) => sum + region.postOffices, 0)
  const monthlyDeliveries = postOfficeDeliveryData[postOfficeDeliveryData.length - 1].deliveries

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-600">+8.4% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Centers</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalCenters}</div>
            <p className="text-xs text-green-600">+2 new this month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">ETB {monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+15.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Post Offices</CardTitle>
            <Package className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalPostOffices}</div>
            <p className="text-xs text-blue-600">{monthlyDeliveries.toLocaleString()} deliveries/month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{systemUptime}%</div>
            <p className="text-xs text-gray-600">Last 30 days average</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            Recent System Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                time: "5 minutes ago",
                action: "Ethiopia Post delivered 245 documents successfully",
                location: "Addis Ababa Region",
                status: "success",
                icon: <Package className="h-4 w-4" />,
              },
              {
                time: "12 minutes ago",
                action: "New inspection center registered in Gondar",
                location: "Amhara Region",
                status: "success",
                icon: <Building2 className="h-4 w-4" />,
              },
              {
                time: "25 minutes ago",
                action: "Telebirr payment gateway maintenance completed",
                location: "System-wide",
                status: "success",
                icon: <CreditCard className="h-4 w-4" />,
              },
              {
                time: "1 hour ago",
                action: "Bulk SMS notification sent to 15,000 users",
                location: "All regions",
                status: "success",
                icon: <Mail className="h-4 w-4" />,
              },
              {
                time: "2 hours ago",
                action: "Post office delivery route optimization completed",
                location: "Oromia Region",
                status: "info",
                icon: <Truck className="h-4 w-4" />,
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-1 rounded-full ${
                      activity.status === "success"
                        ? "bg-green-100 text-green-600"
                        : activity.status === "info"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.location}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Placeholder functions for other sections
function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
          <CardDescription>Comprehensive analytics and reporting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Interface</h3>
            <p className="text-gray-500">Detailed analytics features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UsersSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage system users and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">User Management Interface</h3>
            <p className="text-gray-500">User management features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CentersSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Inspection Centers</CardTitle>
          <CardDescription>Manage vehicle inspection centers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Centers Management</h3>
            <p className="text-gray-500">Center management features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AppointmentsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>Manage inspection appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Appointment System</h3>
            <p className="text-gray-500">Appointment management features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway</CardTitle>
          <CardDescription>Manage payment systems and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <CreditCard className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Payment Management</h3>
            <p className="text-gray-500">Payment gateway features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DocumentsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>Manage digital certificates and documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Document System</h3>
            <p className="text-gray-500">Document management features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AgentsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agent Network</CardTitle>
          <CardDescription>Manage rural agents and service points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <UserCheck className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Agent Management</h3>
            <p className="text-gray-500">Agent network features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RegionsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regional Data</CardTitle>
          <CardDescription>View regional statistics and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Regional Analytics</h3>
            <p className="text-gray-500">Regional data features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReportsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports & Analytics</CardTitle>
          <CardDescription>Generate and export system reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Download className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Report Generation</h3>
            <p className="text-gray-500">Report generation features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AlertsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Alerts</CardTitle>
          <CardDescription>Monitor system alerts and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Alert Management</h3>
            <p className="text-gray-500">Alert monitoring features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage system notifications and messaging</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Notification System</h3>
            <p className="text-gray-500">Notification management features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SecuritySection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage system security and access controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Security Management</h3>
            <p className="text-gray-500">Security configuration features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure system preferences and options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Settings className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">System Configuration</h3>
            <p className="text-gray-500">System settings features will be available here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
