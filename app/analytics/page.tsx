"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const systemMetrics = [
    { title: "Total Registrations", value: "12,847", change: "+12%", icon: Car, color: "text-blue-600" },
    { title: "Active Users", value: "8,234", change: "+8%", icon: Users, color: "text-green-600" },
    { title: "Inspection Centers", value: "45", change: "+3", icon: Building2, color: "text-purple-600" },
    { title: "Revenue Generated", value: "₹2.4M", change: "+15%", icon: DollarSign, color: "text-orange-600" },
  ]

  const revenueBreakdown = [
    { source: "Registration Fees", amount: 1200000, percentage: 50 },
    { source: "Service Charges", amount: 720000, percentage: 30 },
    { source: "Inspection Fees", amount: 360000, percentage: 15 },
    { source: "Penalty Collections", amount: 120000, percentage: 5 },
  ]

  const regionalData = [
    { region: "Addis Ababa", registrations: 4250, revenue: 850000, centers: 12, compliance: 96 },
    { region: "Oromia", registrations: 3100, revenue: 620000, centers: 15, compliance: 92 },
    { region: "Amhara", registrations: 2800, revenue: 560000, centers: 10, compliance: 89 },
    { region: "SNNPR", registrations: 1900, revenue: 380000, centers: 8, compliance: 94 },
    { region: "Tigray", registrations: 797, revenue: 159400, centers: 5, compliance: 87 },
  ]

  const performanceMetrics = [
    { metric: "Average Processing Time", value: "2.3 days", target: "2.0 days", status: "warning" },
    { metric: "Digital Payment Adoption", value: "78%", target: "80%", status: "warning" },
    { metric: "Customer Satisfaction", value: "4.6/5", target: "4.5/5", status: "success" },
    { metric: "System Uptime", value: "99.8%", target: "99.5%", status: "success" },
    { metric: "Compliance Rate", value: "94%", target: "95%", status: "warning" },
    { metric: "Revenue Growth", value: "15%", target: "12%", status: "success" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">ቦሎ Digital</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reporting</h1>
            <p className="text-gray-600">Comprehensive insights into the ቦሎ Digital platform performance</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3" />
                    <span>{metric.change} from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Registration Trends</CardTitle>
                    <CardDescription>Monthly vehicle registration statistics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: "January", registrations: 1250, growth: 8 },
                        { month: "February", registrations: 1180, growth: -6 },
                        { month: "March", registrations: 1420, growth: 20 },
                        { month: "April", registrations: 1380, growth: -3 },
                        { month: "May", registrations: 1520, growth: 10 },
                      ].map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.month}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{data.registrations}</span>
                            <Badge variant={data.growth >= 0 ? "default" : "secondary"}>
                              {data.growth >= 0 ? "+" : ""}
                              {data.growth}%
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Usage</CardTitle>
                    <CardDescription>Platform utilization metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Online Appointments</span>
                          <span>85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Digital Payments</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Document Downloads</span>
                          <span>92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Revenue */}
            <TabsContent value="revenue">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Breakdown</CardTitle>
                      <CardDescription>Income sources and distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {revenueBreakdown.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{item.source}</span>
                              <span className="text-sm font-bold">₹{item.amount.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-600">{item.percentage}% of total revenue</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Summary</CardTitle>
                    <CardDescription>Financial performance overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">₹2.4M</p>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly Growth</span>
                        <span className="text-sm font-medium text-green-600">+15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Average per Registration</span>
                        <span className="text-sm font-medium">₹187</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Service Fee Revenue</span>
                        <span className="text-sm font-medium">₹720K</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Regional */}
            <TabsContent value="regional">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                  <CardDescription>Performance metrics by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Region</th>
                          <th className="text-right py-3 px-4">Registrations</th>
                          <th className="text-right py-3 px-4">Revenue</th>
                          <th className="text-right py-3 px-4">Centers</th>
                          <th className="text-right py-3 px-4">Compliance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regionalData.map((region, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{region.region}</td>
                            <td className="py-3 px-4 text-right">{region.registrations.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">₹{region.revenue.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right">{region.centers}</td>
                            <td className="py-3 px-4 text-right">
                              <Badge
                                variant={
                                  region.compliance >= 95
                                    ? "default"
                                    : region.compliance >= 90
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {region.compliance}%
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance */}
            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                      {metric.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-2">{metric.value}</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Target: {metric.target}</span>
                        <Badge variant={metric.status === "success" ? "default" : "secondary"}>
                          {metric.status === "success" ? "On Track" : "Needs Attention"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Export Options */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Download detailed analytics reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Export Dashboard
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Monthly Report
                </Button>
                <Button variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Revenue Report
                </Button>
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  User Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
