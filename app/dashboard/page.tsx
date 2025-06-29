"use client"

import { useState, useEffect } from "react"
import { GlobalHeader } from "@/components/global-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  FileText,
  Calendar,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Package,
  Download,
  Eye,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface Vehicle {
  plateNumber: string
  make: string
  model: string
  year: number
  color: string
  engineNumber: string
  chassisNumber: string
  registrationDate: string
  expiryDate: string
  status: "active" | "expired" | "suspended"
  ownerName: string
  ownerPhone: string
  inspectionStatus: "valid" | "due" | "overdue"
  lastInspection: string
  nextInspection: string
}

interface Document {
  id: string
  type: "registration" | "inspection" | "insurance" | "license"
  title: string
  issueDate: string
  expiryDate: string
  status: "valid" | "expiring" | "expired"
  downloadUrl: string
}

interface Payment {
  id: string
  type: "registration" | "inspection" | "penalty" | "renewal"
  amount: number
  currency: string
  status: "paid" | "pending" | "failed"
  date: string
  method: "telebirr" | "cbe_birr" | "bank_transfer"
}

interface Delivery {
  id: string
  trackingNumber: string
  documentType: string
  status: "pending" | "in_transit" | "delivered" | "failed"
  estimatedDelivery: string
  currentLocation: string
}

export default function DashboardPage() {
  const searchParams = useSearchParams()
  const plateFromUrl = searchParams.get("plate")

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - in real app, this would come from API
  const vehicles: Vehicle[] = [
    {
      plateNumber: plateFromUrl || "AA-123456",
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      color: "White",
      engineNumber: "1NZ-FE-123456",
      chassisNumber: "JTDBL40E300123456",
      registrationDate: "2020-03-15",
      expiryDate: "2025-03-15",
      status: "active",
      ownerName: "Ahmed Hassan",
      ownerPhone: "+251-911-123456",
      inspectionStatus: "valid",
      lastInspection: "2024-01-15",
      nextInspection: "2025-01-15",
    },
    {
      plateNumber: "AA-789012",
      make: "Hyundai",
      model: "Elantra",
      year: 2019,
      color: "Blue",
      engineNumber: "G4FG-789012",
      chassisNumber: "KMHD14LA5KA789012",
      registrationDate: "2019-08-20",
      expiryDate: "2024-08-20",
      status: "expired",
      ownerName: "Ahmed Hassan",
      ownerPhone: "+251-911-123456",
      inspectionStatus: "overdue",
      lastInspection: "2023-08-20",
      nextInspection: "2024-08-20",
    },
  ]

  const documents: Document[] = [
    {
      id: "1",
      type: "registration",
      title: "Vehicle Registration Certificate",
      issueDate: "2020-03-15",
      expiryDate: "2025-03-15",
      status: "valid",
      downloadUrl: "/documents/registration-aa123456.pdf",
    },
    {
      id: "2",
      type: "inspection",
      title: "Vehicle Inspection Certificate",
      issueDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "valid",
      downloadUrl: "/documents/inspection-aa123456.pdf",
    },
  ]

  const payments: Payment[] = [
    {
      id: "1",
      type: "registration",
      amount: 500,
      currency: "ETB",
      status: "paid",
      date: "2024-01-15",
      method: "telebirr",
    },
    {
      id: "2",
      type: "inspection",
      amount: 200,
      currency: "ETB",
      status: "paid",
      date: "2024-01-15",
      method: "cbe_birr",
    },
  ]

  const deliveries: Delivery[] = [
    {
      id: "1",
      trackingNumber: "EP-2024-001234",
      documentType: "Registration Certificate",
      status: "delivered",
      estimatedDelivery: "2024-01-18",
      currentLocation: "Delivered - Addis Ababa",
    },
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setSelectedVehicle(vehicles[0])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "valid":
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-800"
      case "expired":
      case "overdue":
      case "failed":
        return "bg-red-100 text-red-800"
      case "expiring":
      case "due":
      case "pending":
      case "in_transit":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "valid":
      case "paid":
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "expired":
      case "overdue":
      case "failed":
        return <AlertTriangle className="h-4 w-4" />
      case "expiring":
      case "due":
      case "pending":
      case "in_transit":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <GlobalHeader
          title="Dashboard"
          subtitle="Vehicle Information & Services"
          userRole="citizen"
          userName="Ahmed Hassan"
        />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading your vehicle information...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <GlobalHeader
        title="Dashboard"
        subtitle="Vehicle Information & Services"
        userRole="citizen"
        userName="Ahmed Hassan"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Vehicle Selector */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Vehicles</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Card
                key={vehicle.plateNumber}
                className={`cursor-pointer transition-all ${
                  selectedVehicle?.plateNumber === vehicle.plateNumber
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-mono">{vehicle.plateNumber}</CardTitle>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {getStatusIcon(vehicle.status)}
                      <span className="ml-1 capitalize">{vehicle.status}</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration:</span>
                      <span className={vehicle.status === "expired" ? "text-red-600" : "text-green-600"}>
                        {vehicle.status === "expired" ? "Expired" : "Valid"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inspection:</span>
                      <span
                        className={
                          vehicle.inspectionStatus === "overdue"
                            ? "text-red-600"
                            : vehicle.inspectionStatus === "due"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }
                      >
                        {vehicle.inspectionStatus === "overdue"
                          ? "Overdue"
                          : vehicle.inspectionStatus === "due"
                            ? "Due Soon"
                            : "Valid"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {selectedVehicle && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Vehicle Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="h-5 w-5 mr-2" />
                    Vehicle Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plate Number:</span>
                          <span className="font-mono font-semibold">{selectedVehicle.plateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Make & Model:</span>
                          <span>
                            {selectedVehicle.make} {selectedVehicle.model}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Year:</span>
                          <span>{selectedVehicle.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Color:</span>
                          <span>{selectedVehicle.color}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Technical Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engine Number:</span>
                          <span className="font-mono text-xs">{selectedVehicle.engineNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Chassis Number:</span>
                          <span className="font-mono text-xs">{selectedVehicle.chassisNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">Owner Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Owner:</span>
                          <span>{selectedVehicle.ownerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span>{selectedVehicle.ownerPhone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Registration Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <Badge className={getStatusColor(selectedVehicle.status)}>
                          {getStatusIcon(selectedVehicle.status)}
                          <span className="ml-1 capitalize">{selectedVehicle.status}</span>
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Registered:</span>
                          <span>{new Date(selectedVehicle.registrationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expires:</span>
                          <span>{new Date(selectedVehicle.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {selectedVehicle.status === "expired" && (
                        <Button className="w-full" asChild>
                          <Link href="/payments">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Renew Registration
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Inspection Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <Badge className={getStatusColor(selectedVehicle.inspectionStatus)}>
                          {getStatusIcon(selectedVehicle.inspectionStatus)}
                          <span className="ml-1 capitalize">{selectedVehicle.inspectionStatus}</span>
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Last Inspection:</span>
                          <span>{new Date(selectedVehicle.lastInspection).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Next Due:</span>
                          <span>{new Date(selectedVehicle.nextInspection).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {selectedVehicle.inspectionStatus !== "valid" && (
                        <Button className="w-full" asChild>
                          <Link href="/book-appointment">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Inspection
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Vehicle Documents
                  </CardTitle>
                  <CardDescription>Download and manage your vehicle certificates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-blue-600" />
                          <div>
                            <h3 className="font-semibold">{doc.title}</h3>
                            <p className="text-sm text-gray-600">
                              Issued: {new Date(doc.issueDate).toLocaleDateString()} | Expires:{" "}
                              {new Date(doc.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusIcon(doc.status)}
                            <span className="ml-1 capitalize">{doc.status}</span>
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment History
                  </CardTitle>
                  <CardDescription>View your payment history and make new payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <CreditCard className="h-8 w-8 text-green-600" />
                          <div>
                            <h3 className="font-semibold capitalize">{payment.type} Fee</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(payment.date).toLocaleDateString()} |
                              {payment.method.replace("_", " ").toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="font-semibold">
                            {payment.amount} {payment.currency}
                          </span>
                          <Badge className={getStatusColor(payment.status)}>
                            {getStatusIcon(payment.status)}
                            <span className="ml-1 capitalize">{payment.status}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/payments">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Make New Payment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Document Delivery via Ethiopia Post
                  </CardTitle>
                  <CardDescription>Track your document deliveries and schedule new ones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deliveries.map((delivery) => (
                      <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Package className="h-8 w-8 text-purple-600" />
                          <div>
                            <h3 className="font-semibold">{delivery.documentType}</h3>
                            <p className="text-sm text-gray-600">Tracking: {delivery.trackingNumber}</p>
                            <p className="text-sm text-gray-500">{delivery.currentLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(delivery.status)}>
                            {getStatusIcon(delivery.status)}
                            <span className="ml-1 capitalize">{delivery.status.replace("_", " ")}</span>
                          </Badge>
                          <Button size="sm" variant="outline">
                            Track Package
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href="/documents">
                        <Package className="h-4 w-4 mr-2" />
                        Schedule New Delivery
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle>Book Inspection</CardTitle>
                    <CardDescription>Schedule your next vehicle inspection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href="/book-appointment">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CreditCard className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle>Make Payment</CardTitle>
                    <CardDescription>Pay registration fees and penalties</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href="/payments">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <FileText className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle>Download Documents</CardTitle>
                    <CardDescription>Access your digital certificates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href="/documents">
                        <FileText className="h-4 w-4 mr-2" />
                        View Documents
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Package className="h-8 w-8 text-orange-600 mb-2" />
                    <CardTitle>Document Delivery</CardTitle>
                    <CardDescription>Schedule delivery via Ethiopia Post</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href="/documents">
                        <Package className="h-4 w-4 mr-2" />
                        Schedule Delivery
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MapPin className="h-8 w-8 text-red-600 mb-2" />
                    <CardTitle>Find Centers</CardTitle>
                    <CardDescription>Locate nearby inspection centers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Find Centers
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Phone className="h-8 w-8 text-indigo-600 mb-2" />
                    <CardTitle>Get Support</CardTitle>
                    <CardDescription>Contact customer support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
