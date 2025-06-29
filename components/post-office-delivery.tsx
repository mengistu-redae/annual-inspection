"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Package,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Search,
  Calculator,
  Building2,
} from "lucide-react"
import {
  findNearestPostOffices,
  createDocumentDelivery,
  trackDocumentDelivery,
  calculateDeliveryFee,
} from "@/app/actions/post-office-actions"
import type { PostOfficeLocation, DocumentDelivery } from "@/lib/ethiopia-post-api"

interface PostOfficeDeliveryProps {
  vehicleId?: string
  documentType?: string
}

export function PostOfficeDelivery({ vehicleId, documentType }: PostOfficeDeliveryProps) {
  const [nearbyPostOffices, setNearbyPostOffices] = useState<PostOfficeLocation[]>([])
  const [selectedPostOffice, setSelectedPostOffice] = useState<PostOfficeLocation | null>(null)
  const [deliveryFee, setDeliveryFee] = useState<{ fee: number; estimatedDays: number; currency: string } | null>(null)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<DocumentDelivery | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Get user's location and find nearby post offices
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const result = await findNearestPostOffices(latitude, longitude)
          if (result.success) {
            setNearbyPostOffices(result.data)
          }
        },
        (error) => {
          console.error("Geolocation error:", error)
          // Fallback to major Ethiopian cities
          setNearbyPostOffices([
            {
              id: "addis-central",
              name: "Addis Ababa Central Post Office",
              address: "Churchill Avenue, Addis Ababa",
              region: "Addis Ababa",
              zone: "Addis Ababa",
              woreda: "Kirkos",
              coordinates: { latitude: 9.032, longitude: 38.7469 },
              services: ["Document Delivery", "Express Service", "Tracking"],
              operatingHours: {
                weekdays: "8:00 AM - 6:00 PM",
                saturday: "8:00 AM - 4:00 PM",
                sunday: "Closed",
              },
              contactInfo: {
                phone: "+251-11-551-7000",
                email: "addis.central@ethiopiapost.et",
              },
              capacity: {
                dailyDeliveries: 500,
                storageCapacity: 2000,
              },
            },
          ])
        },
      )
    }
  }, [])

  const handleCreateDelivery = async (formData: FormData) => {
    setLoading(true)
    setError("")
    setSuccess("")

    const result = await createDocumentDelivery(formData)

    if (result.success) {
      setSuccess(result.message || "Document delivery scheduled successfully!")
    } else {
      setError(result.error || "Failed to schedule delivery")
    }

    setLoading(false)
  }

  const handleTrackDelivery = async () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number")
      return
    }

    setLoading(true)
    setError("")

    const result = await trackDocumentDelivery(trackingNumber)

    if (result.success) {
      setTrackingResult(result.data)
    } else {
      setError(result.error || "Failed to track delivery")
    }

    setLoading(false)
  }

  const handleCalculateFee = async (postOfficeId: string, address: string, serviceType: "STANDARD" | "EXPRESS") => {
    const result = await calculateDeliveryFee(postOfficeId, address, serviceType)
    if (result.success) {
      setDeliveryFee(result.data)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "in_transit":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
      case "returned":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "pending":
        return 25
      case "in_transit":
        return 75
      case "delivered":
        return 100
      case "failed":
      case "returned":
        return 0
      default:
        return 0
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            Ethiopia Post Document Delivery
          </CardTitle>
          <CardDescription>
            Get your vehicle documents delivered to your doorstep through Ethiopia Post offices nationwide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">Schedule Delivery</TabsTrigger>
              <TabsTrigger value="track">Track Package</TabsTrigger>
              <TabsTrigger value="locations">Post Offices</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-6">
              <form action={handleCreateDelivery} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">Vehicle ID</Label>
                    <Input
                      id="vehicleId"
                      name="vehicleId"
                      defaultValue={vehicleId}
                      placeholder="Enter vehicle ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select name="documentType" defaultValue={documentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="registration">Registration Certificate</SelectItem>
                        <SelectItem value="inspection_certificate">Inspection Certificate</SelectItem>
                        <SelectItem value="license_plate">License Plate</SelectItem>
                        <SelectItem value="renewal">Renewal Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientName">Recipient Name</Label>
                    <Input id="recipientName" name="recipientName" placeholder="Full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipientPhone">Phone Number</Label>
                    <Input id="recipientPhone" name="recipientPhone" placeholder="+251-9-XXXX-XXXX" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Input
                    id="deliveryAddress"
                    name="deliveryAddress"
                    placeholder="Complete delivery address"
                    required
                    onChange={(e) => {
                      if (selectedPostOffice && e.target.value) {
                        handleCalculateFee(selectedPostOffice.id, e.target.value, "STANDARD")
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postOfficeId">Nearest Post Office</Label>
                  <Select
                    name="postOfficeId"
                    onValueChange={(value) => {
                      const office = nearbyPostOffices.find((o) => o.id === value)
                      setSelectedPostOffice(office || null)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select post office" />
                    </SelectTrigger>
                    <SelectContent>
                      {nearbyPostOffices.map((office) => (
                        <SelectItem key={office.id} value={office.id}>
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2" />
                            {office.name} - {office.address}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {deliveryFee && (
                  <Alert>
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-center">
                        <span>
                          Delivery Fee: <strong>ETB {deliveryFee.fee}</strong>
                        </span>
                        <span>
                          Estimated Delivery: <strong>{deliveryFee.estimatedDays} days</strong>
                        </span>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="urgentDelivery" name="urgentDelivery" value="true" className="rounded" />
                  <Label htmlFor="urgentDelivery">Express Delivery (+ETB 50)</Label>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Scheduling..." : "Schedule Delivery"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="track" className="space-y-6">
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter tracking number (e.g., EP123456789ET)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <Button onClick={handleTrackDelivery} disabled={loading}>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </Button>
                </div>

                {trackingResult && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Tracking: {trackingResult.trackingNumber}</span>
                        <Badge className={getStatusColor(trackingResult.status)}>
                          {trackingResult.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Document Type: {trackingResult.documentType.replace("_", " ")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Delivery Progress</span>
                          <span>{getStatusProgress(trackingResult.status)}%</span>
                        </div>
                        <Progress value={getStatusProgress(trackingResult.status)} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p>
                            <strong>Recipient:</strong> {trackingResult.recipientName}
                          </p>
                          <p>
                            <strong>Phone:</strong> {trackingResult.recipientPhone}
                          </p>
                          <p>
                            <strong>Address:</strong> {trackingResult.deliveryAddress}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>Estimated Delivery:</strong>{" "}
                            {new Date(trackingResult.estimatedDelivery).toLocaleDateString()}
                          </p>
                          {trackingResult.actualDelivery && (
                            <p>
                              <strong>Delivered On:</strong>{" "}
                              {new Date(trackingResult.actualDelivery).toLocaleDateString()}
                            </p>
                          )}
                          <p>
                            <strong>Delivery Fee:</strong> ETB {trackingResult.deliveryFee}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            <TabsContent value="locations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {nearbyPostOffices.map((office) => (
                  <Card key={office.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{office.name}</CardTitle>
                      <CardDescription>{office.address}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                        {office.region}, {office.zone}
                      </div>

                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-green-600" />
                        {office.contactInfo.phone}
                      </div>

                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-purple-600" />
                        {office.contactInfo.email}
                      </div>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-orange-600" />
                          <span className="font-medium">Operating Hours:</span>
                        </div>
                        <p className="ml-6">Weekdays: {office.operatingHours.weekdays}</p>
                        <p className="ml-6">Saturday: {office.operatingHours.saturday}</p>
                        <p className="ml-6">Sunday: {office.operatingHours.sunday}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {office.services.map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Daily Capacity: {office.capacity.dailyDeliveries}</span>
                          <span>Storage: {office.capacity.storageCapacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
