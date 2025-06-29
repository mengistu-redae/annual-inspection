"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Car,
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
} from "lucide-react"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const documents = [
    {
      id: "1",
      type: "Vehicle Registration",
      title: "Blue Card - ET-1234-AA",
      vehicle: "ET-1234-AA",
      issueDate: "2023-03-15",
      expiryDate: "2024-03-15",
      status: "active",
      downloadUrl: "#",
    },
    {
      id: "2",
      type: "Inspection Certificate",
      title: "Technical Inspection - ET-1234-AA",
      vehicle: "ET-1234-AA",
      issueDate: "2024-01-10",
      expiryDate: "2025-01-10",
      status: "active",
      downloadUrl: "#",
    },
    {
      id: "3",
      type: "Insurance Certificate",
      title: "Third Party Insurance - ET-1234-AA",
      vehicle: "ET-1234-AA",
      issueDate: "2023-12-01",
      expiryDate: "2024-12-01",
      status: "active",
      downloadUrl: "#",
    },
    {
      id: "4",
      type: "Payment Receipt",
      title: "Road Use Fee Payment",
      vehicle: "ET-1234-AA",
      issueDate: "2024-01-08",
      expiryDate: null,
      status: "completed",
      downloadUrl: "#",
    },
    {
      id: "5",
      type: "Vehicle Registration",
      title: "Blue Card - ET-5678-BB",
      vehicle: "ET-5678-BB",
      issueDate: "2022-06-20",
      expiryDate: "2023-06-20",
      status: "expired",
      downloadUrl: "#",
    },
    {
      id: "6",
      type: "Inspection Certificate",
      title: "Technical Inspection - ET-5678-BB",
      vehicle: "ET-5678-BB",
      issueDate: "2023-05-15",
      expiryDate: "2024-05-15",
      status: "expiring",
      downloadUrl: "#",
    },
  ]

  const certificates = [
    {
      id: "CERT-001",
      title: "Digital Vehicle Registration Certificate",
      vehicle: "ET-1234-AA",
      type: "Registration",
      issuer: "Federal Transport Authority",
      issueDate: "2024-01-15",
      validUntil: "2025-01-15",
      verificationCode: "VRC-2024-001234",
      status: "active",
    },
    {
      id: "CERT-002",
      title: "Technical Inspection Certificate",
      vehicle: "ET-1234-AA",
      type: "Inspection",
      issuer: "Addis Ababa Inspection Center",
      issueDate: "2024-01-10",
      validUntil: "2025-01-10",
      verificationCode: "TIC-2024-005678",
      status: "active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "expired":
        return <AlertCircle className="h-4 w-4" />
      case "expiring":
        return <Calendar className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ቦሎ Digital</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
            <p className="text-gray-600">Access and manage your vehicle documents and certificates</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="documents" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="documents">All Documents</TabsTrigger>
              <TabsTrigger value="certificates">Digital Certificates</TabsTrigger>
            </TabsList>

            {/* All Documents */}
            <TabsContent value="documents">
              <div className="grid gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{doc.title}</h3>
                            <p className="text-gray-600">{doc.type}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>Issued: {doc.issueDate}</span>
                              {doc.expiryDate && <span>Expires: {doc.expiryDate}</span>}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(doc.status)}>
                            {getStatusIcon(doc.status)}
                            <span className="ml-1 capitalize">{doc.status}</span>
                          </Badge>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Digital Certificates */}
            <TabsContent value="certificates">
              <div className="grid gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Shield className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{cert.title}</CardTitle>
                            <CardDescription>
                              {cert.vehicle} • {cert.issuer}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Certificate ID</p>
                            <p className="text-sm text-gray-600">{cert.id}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Issue Date</p>
                            <p className="text-sm text-gray-600">{cert.issueDate}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Valid Until</p>
                            <p className="text-sm text-gray-600">{cert.validUntil}</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Verification Code</p>
                            <p className="text-sm text-gray-600 font-mono">{cert.verificationCode}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Digital Signature</p>
                            <p className="text-sm text-gray-600">SHA-256 Encrypted</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Blockchain Record</p>
                            <p className="text-sm text-gray-600">Immutable ledger entry</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-6">
                        <Button>
                          <Eye className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button variant="outline">Share Certificate</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Document Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-gray-600">Across all vehicles</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Documents</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">4</div>
                <p className="text-xs text-gray-600">Currently valid</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <p className="text-xs text-gray-600">Within 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Expired</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
                <p className="text-xs text-gray-600">Needs renewal</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
