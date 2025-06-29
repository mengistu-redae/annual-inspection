"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MapPin, DollarSign, TrendingUp, Phone, CheckCircle, Clock, Star } from "lucide-react"

export function AgentNetworkDashboard() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents = [
    {
      id: "AGT-001",
      name: "Abebe Kebede",
      location: "Bahir Dar, Amhara",
      phone: "+251-9-11-22-33-44",
      email: "abebe.kebede@agent.et",
      status: "active",
      rating: 4.8,
      totalTransactions: 234,
      monthlyRevenue: 12500,
      commission: 1875,
      servicesOffered: ["Registration", "Payments", "Document Collection"],
      joinDate: "2023-06-15",
    },
    {
      id: "AGT-002",
      name: "Almaz Tadesse",
      location: "Hawassa, SNNPR",
      phone: "+251-9-22-33-44-55",
      email: "almaz.tadesse@agent.et",
      status: "active",
      rating: 4.9,
      totalTransactions: 189,
      monthlyRevenue: 9450,
      commission: 1417,
      servicesOffered: ["Registration", "Payments", "Insurance"],
      joinDate: "2023-08-20",
    },
    {
      id: "AGT-003",
      name: "Dawit Haile",
      location: "Mekelle, Tigray",
      phone: "+251-9-33-44-55-66",
      email: "dawit.haile@agent.et",
      status: "pending",
      rating: 4.6,
      totalTransactions: 156,
      monthlyRevenue: 7800,
      commission: 1170,
      servicesOffered: ["Registration", "Document Collection"],
      joinDate: "2023-09-10",
    },
    {
      id: "AGT-004",
      name: "Hanan Ahmed",
      location: "Dire Dawa",
      phone: "+251-9-44-55-66-77",
      email: "hanan.ahmed@agent.et",
      status: "inactive",
      rating: 4.3,
      totalTransactions: 98,
      monthlyRevenue: 4900,
      commission: 735,
      servicesOffered: ["Payments", "Document Collection"],
      joinDate: "2023-11-05",
    },
  ]

  const agentStats = [
    { title: "Total Agents", value: "127", change: "+12", icon: Users, color: "text-blue-600" },
    { title: "Active Agents", value: "98", change: "+8", icon: CheckCircle, color: "text-green-600" },
    { title: "Monthly Revenue", value: "₹245K", change: "+15%", icon: DollarSign, color: "text-purple-600" },
    { title: "Avg Rating", value: "4.7", change: "+0.2", icon: Star, color: "text-orange-600" },
  ]

  const recentTransactions = [
    {
      id: "TXN-001",
      agentId: "AGT-001",
      agentName: "Abebe Kebede",
      service: "Vehicle Registration",
      customer: "Tesfaye Bekele",
      amount: 850,
      commission: 85,
      status: "completed",
      timestamp: "2024-01-15 14:30",
    },
    {
      id: "TXN-002",
      agentId: "AGT-002",
      agentName: "Almaz Tadesse",
      service: "Payment Collection",
      customer: "Meron Assefa",
      amount: 500,
      commission: 50,
      status: "completed",
      timestamp: "2024-01-15 13:45",
    },
    {
      id: "TXN-003",
      agentId: "AGT-001",
      agentName: "Abebe Kebede",
      service: "Document Delivery",
      customer: "Yohannes Girma",
      amount: 100,
      commission: 10,
      status: "pending",
      timestamp: "2024-01-15 12:20",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Agent Network Management</span>
          </CardTitle>
          <CardDescription>Manage rural agents and community representatives</CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>{stat.change} from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="agents">
          <div className="grid gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{agent.location}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>{agent.phone}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Star className="h-3 w-3" />
                            <span>{agent.rating}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          agent.status === "active" ? "default" : agent.status === "pending" ? "secondary" : "outline"
                        }
                      >
                        {agent.status}
                      </Badge>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium">₹{agent.monthlyRevenue.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Monthly Revenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{agent.totalTransactions}</p>
                      <p className="text-xs text-gray-600">Total Transactions</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">₹{agent.commission}</p>
                      <p className="text-xs text-gray-600">Monthly Commission</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{agent.servicesOffered.length}</p>
                      <p className="text-xs text-gray-600">Services Offered</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.servicesOffered.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">
                      Contact Agent
                    </Button>
                    <Button size="sm" variant="outline">
                      View Performance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Agent Transactions</CardTitle>
              <CardDescription>Track all transactions processed by agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                        }`}
                      >
                        {transaction.status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.service}</p>
                        <p className="text-sm text-gray-600">
                          Agent: {transaction.agentName} • Customer: {transaction.customer}
                        </p>
                        <p className="text-xs text-gray-500">{transaction.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{transaction.amount}</p>
                      <p className="text-sm text-green-600">Commission: ₹{transaction.commission}</p>
                      <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruitment">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Application</CardTitle>
                <CardDescription>Register new agents for the network</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+251-9-XX-XX-XX-XX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="agent@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="City, Region" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Previous Experience</Label>
                  <textarea
                    id="experience"
                    className="w-full p-3 border rounded-md h-20"
                    placeholder="Describe relevant experience..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Services to Offer</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Registration",
                      "Payments",
                      "Document Collection",
                      "Insurance",
                      "Inspections",
                      "Customer Support",
                    ].map((service) => (
                      <label key={service} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button className="w-full">Submit Application</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Requirements</CardTitle>
                <CardDescription>Criteria for becoming an agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Valid Ethiopian ID</p>
                      <p className="text-sm text-gray-600">Kebele ID or National ID required</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Mobile Phone Access</p>
                      <p className="text-sm text-gray-600">Smartphone preferred, basic phone acceptable</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Local Community Trust</p>
                      <p className="text-sm text-gray-600">Known and trusted in local community</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Basic Literacy</p>
                      <p className="text-sm text-gray-600">Able to read and write in Amharic or English</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Commitment</p>
                      <p className="text-sm text-gray-600">Available for training and ongoing support</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Commission Structure:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Registration: 10% of fee</li>
                    <li>• Payments: 5% of amount</li>
                    <li>• Document delivery: Fixed ₹20</li>
                    <li>• Insurance: 15% of premium</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Training Modules</CardTitle>
                  <CardDescription>Comprehensive training program for agents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        module: "System Basics",
                        description: "Introduction to ቦሎ Digital platform",
                        duration: "2 hours",
                        status: "available",
                        completion: 95,
                      },
                      {
                        module: "Vehicle Registration Process",
                        description: "Complete registration workflow",
                        duration: "3 hours",
                        status: "available",
                        completion: 87,
                      },
                      {
                        module: "Payment Processing",
                        description: "Handling payments and receipts",
                        duration: "1.5 hours",
                        status: "available",
                        completion: 92,
                      },
                      {
                        module: "Customer Service",
                        description: "Communication and problem solving",
                        duration: "2 hours",
                        status: "available",
                        completion: 78,
                      },
                      {
                        module: "Compliance & Security",
                        description: "Legal requirements and data protection",
                        duration: "1 hour",
                        status: "coming-soon",
                        completion: 0,
                      },
                    ].map((module, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{module.module}</p>
                            <p className="text-sm text-gray-600">{module.description}</p>
                            <p className="text-xs text-gray-500">Duration: {module.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={module.status === "available" ? "default" : "secondary"}>
                            {module.status === "available" ? "Available" : "Coming Soon"}
                          </Badge>
                          {module.status === "available" && (
                            <div className="mt-2">
                              <p className="text-sm font-medium">{module.completion}% completed</p>
                              <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${module.completion}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Training Schedule</CardTitle>
                <CardDescription>Upcoming training sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    date: "Jan 20, 2024",
                    time: "10:00 AM",
                    module: "System Basics",
                    location: "Addis Ababa",
                    spots: "5/20",
                  },
                  {
                    date: "Jan 25, 2024",
                    time: "2:00 PM",
                    module: "Payment Processing",
                    location: "Bahir Dar",
                    spots: "12/15",
                  },
                  {
                    date: "Feb 1, 2024",
                    time: "9:00 AM",
                    module: "Customer Service",
                    location: "Online",
                    spots: "8/50",
                  },
                ].map((session, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <p className="font-medium">{session.module}</p>
                    <p className="text-sm text-gray-600">
                      {session.date} at {session.time}
                    </p>
                    <p className="text-sm text-gray-600">{session.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">Spots: {session.spots}</span>
                      <Button size="sm" variant="outline">
                        Register
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
