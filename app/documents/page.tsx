"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostOfficeDelivery } from "@/components/post-office-delivery"
import {
  FileText,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Package,
  Truck,
  Building2,
} from "lucide-react"

interface Document {
  id: string
  type: "registration" | "inspection" | "license" | "renewal"
  title: string
  vehicleId: string
  status: "ready" | "processing" | "expired" | "pending"
  issueDate: string
  expiryDate: string
  downloadUrl?: string
  deliveryStatus?: "not_requested" | "scheduled" | "in_transit" | "delivered"
  trackingNumber?: string
}

const sampleDocuments: Document[] = [
  {
    id: "1",
    type: "registration",
    title: "Vehicle Registration Certificate",
    vehicleId: "ET-AA-12345",
    status: "ready",
    issueDate: "2024-01-15",
    expiryDate: "2025-01-15",
    downloadUrl: "/documents/registration-ET-AA-12345.pdf",
    deliveryStatus: "not_requested",
  },
  {
    id: "2",
    type: "inspection",
    title: "Vehicle Inspection Certificate",
    vehicleId: "ET-AA-12345",
    status: "ready",
    issueDate: "2024-06-10",
    expiryDate: "2025-06-10",
    downloadUrl: "/documents/inspection-ET-AA-12345.pdf",
    deliveryStatus: "delivered",
    trackingNumber: "EP123456789ET",
  },
  {
    id: "3",
    type: "license",
    title: "License Plate Certificate",
    vehicleId: "ET-OR-67890",
    status: "processing",
    issueDate: "2024-12-01",
    expiryDate: "2025-12-01",
    deliveryStatus: "scheduled",
    trackingNumber: "EP987654321ET",
  },
  {
    id: "4",
    type: "renewal",
    title: "Registration Renewal",
    vehicleId: "ET-AM-54321",
    status: "pending",
    issueDate: "2024-11-20",
    expiryDate: "2025-11-20",
    deliveryStatus: "in_transit",
    trackingNumber: "EP456789123ET",
  },
]

export default function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500"
      case "processing":
        return "bg-blue-500"
      case "expired":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "in_transit":
        return "bg-blue-500"
      case "scheduled":
        return "bg-yellow-500"
      case "not_requested":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "expired":
        return <AlertTriangle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDeliveryIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "in_transit":
        return <Truck className="h-4 w-4" />
      case "scheduled":
        return <Package className="h-4 w-4" />
      case "not_requested":
        return <Building2 className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Manage your vehicle documents and delivery options</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Package className="h-3 w-3 mr-1" />
            Ethiopia Post Integration
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="delivery">Post Office Delivery</TabsTrigger>
          <TabsTrigger value="tracking">Track Deliveries</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-lg">{doc.title}</span>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1">{doc.status}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription>Vehicle ID: {doc.vehicleId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                      <span>Issued: {new Date(doc.issueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-red-600" />
                      <span>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {doc.deliveryStatus && (
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Delivery Status:</span>
                        <Badge className={getDeliveryStatusColor(doc.deliveryStatus)}>
                          {getDeliveryIcon(doc.deliveryStatus)}
                          <span className="ml-1">{doc.deliveryStatus.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      {doc.trackingNumber && (
                        <p className="text-xs text-gray-600 mt-1">Tracking: {doc.trackingNumber}</p>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {doc.downloadUrl && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>

                  {doc.status === "ready" && doc.deliveryStatus === "not_requested" && (
                    <Button size="sm" className="w-full" onClick={() => setSelectedDocument(doc)}>
                      <Package className="h-4 w-4 mr-2" />
                      Request Delivery
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="delivery">
          <PostOfficeDelivery vehicleId={selectedDocument?.vehicleId} documentType={selectedDocument?.type} />
        </TabsContent>

        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-blue-600" />
                Active Deliveries
              </CardTitle>
              <CardDescription>Track your documents being delivered via Ethiopia Post</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleDocuments
                  .filter((doc) => doc.deliveryStatus && doc.deliveryStatus !== "not_requested")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${getDeliveryStatusColor(doc.deliveryStatus!)}`}>
                          {getDeliveryIcon(doc.deliveryStatus!)}
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-gray-600">Vehicle: {doc.vehicleId}</p>
                          {doc.trackingNumber && (
                            <p className="text-xs text-gray-500">Tracking: {doc.trackingNumber}</p>
                          )}
                        </div>
                      </div>
                      <Badge className={getDeliveryStatusColor(doc.deliveryStatus!)}>
                        {doc.deliveryStatus!.replace("_", " ").toUpperCase()}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
