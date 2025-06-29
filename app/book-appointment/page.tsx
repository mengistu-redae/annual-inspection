"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Car, MapPin, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import { format } from "date-fns"

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedCenter, setSelectedCenter] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [step, setStep] = useState(1)

  const inspectionCenters = [
    {
      id: "1",
      name: "Addis Ababa Central Inspection Center",
      location: "Bole District, Addis Ababa",
      rating: 4.8,
      availableSlots: 12,
      services: ["Emission Test", "Brake Check", "Light Inspection", "General Safety"],
    },
    {
      id: "2",
      name: "Bahir Dar Vehicle Inspection Hub",
      location: "Bahir Dar, Amhara Region",
      rating: 4.6,
      availableSlots: 8,
      services: ["Emission Test", "Brake Check", "Light Inspection", "Tire Check"],
    },
    {
      id: "3",
      name: "Hawassa Inspection Center",
      location: "Hawassa, SNNPR",
      rating: 4.7,
      availableSlots: 15,
      services: ["Full Inspection", "Emission Test", "Safety Check"],
    },
  ]

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ]

  const handleBooking = () => {
    // Simulate booking process
    setStep(4)
  }

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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Vehicle Inspection</h1>
            <p className="text-gray-600">Schedule your annual vehicle inspection appointment</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[
                { step: 1, title: "Vehicle Info" },
                { step: 2, title: "Select Center" },
                { step: 3, title: "Choose Time" },
                { step: 4, title: "Confirmation" },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= item.step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step > item.step ? <CheckCircle className="h-4 w-4" /> : item.step}
                  </div>
                  <span className={`ml-2 text-sm ${step >= item.step ? "text-blue-600" : "text-gray-600"}`}>
                    {item.title}
                  </span>
                  {index < 3 && <div className="w-8 h-px bg-gray-300 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Vehicle Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Enter your vehicle details for inspection booking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="plateNumber">Plate Number</Label>
                    <Input id="plateNumber" placeholder="ET-1234-AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input id="make" placeholder="Toyota" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="Corolla" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" placeholder="2020" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engineNumber">Engine Number</Label>
                    <Input id="engineNumber" placeholder="ENG123456" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input id="ownerName" placeholder="Full name as on registration" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+251-9-12-34-56-78" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any specific concerns or requirements..." />
                </div>
                <Button onClick={() => setStep(2)} className="w-full">
                  Continue to Center Selection
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Inspection Center */}
          {step === 2 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Inspection Center</CardTitle>
                  <CardDescription>Choose from authorized inspection centers near you</CardDescription>
                </CardHeader>
              </Card>

              <div className="grid gap-6">
                {inspectionCenters.map((center) => (
                  <Card
                    key={center.id}
                    className={`cursor-pointer transition-all ${
                      selectedCenter === center.id ? "ring-2 ring-blue-600 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedCenter(center.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{center.name}</h3>
                            <Badge variant="secondary">★ {center.rating}</Badge>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600 mb-3">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{center.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {center.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {service}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{center.availableSlots} slots available</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹500</p>
                          <p className="text-sm text-gray-600">Inspection Fee</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1" disabled={!selectedCenter}>
                  Continue to Time Selection
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Choose Date and Time */}
          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                  <CardDescription>Choose your preferred inspection date</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Time Slots</CardTitle>
                  <CardDescription>
                    {selectedDate ? `Available slots for ${format(selectedDate, "PPP")}` : "Please select a date first"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          onClick={() => setSelectedTime(time)}
                          className="justify-center"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Select a date to view available time slots</p>
                  )}
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleBooking} className="flex-1" disabled={!selectedDate || !selectedTime}>
                    Confirm Booking
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8">Your vehicle inspection appointment has been successfully booked.</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                  <h3 className="font-semibold mb-4">Appointment Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Booking ID:</span>
                      <span className="font-medium">BK-2024-001234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">{selectedDate && format(selectedDate, "PPP")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Center:</span>
                      <span className="font-medium">Addis Ababa Central</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fee:</span>
                      <span className="font-medium">₹500</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    A confirmation SMS and email have been sent to your registered contact details.
                  </p>
                  <div className="flex space-x-4 justify-center">
                    <Link href="/dashboard">
                      <Button>Return to Dashboard</Button>
                    </Link>
                    <Button variant="outline">Download Receipt</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
