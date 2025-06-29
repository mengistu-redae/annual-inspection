"use client"

import type React from "react"

import { useState } from "react"
import { GlobalHeader } from "@/components/global-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Car,
  FileText,
  Calendar,
  CreditCard,
  Shield,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Search,
  Package,
  Truck,
  Clock,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [plateNumber, setPlateNumber] = useState("")

  const features = [
    {
      icon: <Car className="h-8 w-8 text-blue-600" />,
      title: "Vehicle Registration",
      description: "Register new vehicles and renew existing registrations online",
      href: "/dashboard",
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      title: "Book Inspection",
      description: "Schedule vehicle inspections at certified centers nationwide",
      href: "/book-appointment",
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Digital Documents",
      description: "Access and download your vehicle certificates instantly",
      href: "/documents",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-yellow-600" />,
      title: "Online Payments",
      description: "Pay fees using Telebirr, CBE Birr, or bank transfer",
      href: "/payments",
    },
    {
      icon: <Package className="h-8 w-8 text-red-600" />,
      title: "Document Delivery",
      description: "Get documents delivered via Ethiopia Post nationwide",
      href: "/documents",
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: "Secure & Verified",
      description: "Government-certified digital certificates and records",
      href: "/dashboard",
    },
  ]

  const stats = [
    { label: "Registered Vehicles", value: "2.3M+", icon: <Car className="h-5 w-5" /> },
    { label: "Active Users", value: "850K+", icon: <Users className="h-5 w-5" /> },
    { label: "Inspection Centers", value: "450+", icon: <MapPin className="h-5 w-5" /> },
    { label: "Post Offices", value: "402", icon: <Package className="h-5 w-5" /> },
  ]

  const testimonials = [
    {
      name: "Ahmed Hassan",
      location: "Addis Ababa",
      rating: 5,
      comment: "Very easy to use. I registered my car in just 10 minutes!",
    },
    {
      name: "Meron Tadesse",
      location: "Bahir Dar",
      rating: 5,
      comment: "The Ethiopia Post delivery service is excellent. Got my documents in 2 days.",
    },
    {
      name: "Dawit Bekele",
      location: "Hawassa",
      rating: 4,
      comment: "Great system. Payment with Telebirr was very smooth.",
    },
  ]

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (plateNumber.trim()) {
      // Redirect to dashboard with plate number
      window.location.href = `/dashboard?plate=${encodeURIComponent(plateNumber)}`
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <GlobalHeader userRole="citizen" showSearch={true} showNotifications={false} showUserMenu={true} />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                ቦሎ Digital
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ethiopia's official digital vehicle registration system. Register vehicles, book inspections, and manage
              documents online with secure government-certified services.
            </p>

            {/* Quick Search */}
            <Card className="max-w-md mx-auto mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Quick Vehicle Lookup</CardTitle>
                <CardDescription>Enter your plate number to view vehicle information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuickSearch} className="space-y-4">
                  <div>
                    <Label htmlFor="plateNumber">Plate Number</Label>
                    <Input
                      id="plateNumber"
                      type="text"
                      placeholder="e.g., AA-12345"
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      className="text-center text-lg font-mono"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={!plateNumber.trim()}>
                    <Search className="h-4 w-4 mr-2" />
                    Search Vehicle
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/dashboard">
                  <Car className="h-5 w-5 mr-2" />
                  Get Started
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/book-appointment">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Inspection
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Vehicle Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for vehicle registration, inspection, and document management in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    {feature.icon}
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto" asChild>
                    <Link href={feature.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ethiopia Post Integration Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full">
                <Package className="h-12 w-12" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Document Delivery via Ethiopia Post</h2>
            <p className="text-xl mb-8 text-purple-100">
              Get your vehicle documents delivered to your doorstep through Ethiopia Post's nationwide network of 402+
              post offices. Fast, secure, and reliable delivery across all regions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Truck className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-2">Nationwide Coverage</h3>
                <p className="text-sm text-purple-100">Delivery to all regions and rural areas</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-purple-100">2-5 days standard, 1-2 days express</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-2">Secure Handling</h3>
                <p className="text-sm text-purple-100">Government document security protocols</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/documents">
                <Package className="h-5 w-5 mr-2" />
                Schedule Delivery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Citizens Say</h2>
            <p className="text-xl text-gray-600">Trusted by hundreds of thousands of Ethiopian vehicle owners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-600 italic">"{testimonial.comment}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-xl text-gray-600">Our support team is here to assist you with any questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Phone className="h-8 w-8 mx-auto text-blue-600 mb-4" />
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>Call us for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">+251-11-123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 8AM-6PM</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-8 w-8 mx-auto text-green-600 mb-4" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Send us your questions anytime</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">support@bolo.gov.et</p>
                  <p className="text-sm text-gray-500">24-48 hour response</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="h-8 w-8 mx-auto text-purple-600 mb-4" />
                  <CardTitle>Visit Us</CardTitle>
                  <CardDescription>Find our offices nationwide</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">450+ Locations</p>
                  <p className="text-sm text-gray-500">Inspection centers & agents</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ቦ</span>
                </div>
                <span className="text-xl font-bold">ቦሎ Digital</span>
              </div>
              <p className="text-gray-400 mb-4">Ethiopia's official vehicle registration and inspection system.</p>
              <div className="flex space-x-2">
                <Badge variant="secondary" className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Government Certified
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Vehicle Registration
                  </Link>
                </li>
                <li>
                  <Link href="/book-appointment" className="hover:text-white">
                    Book Inspection
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="hover:text-white">
                    Digital Documents
                  </Link>
                </li>
                <li>
                  <Link href="/payments" className="hover:text-white">
                    Online Payments
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="hover:text-white">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Federal Democratic Republic of Ethiopia. All rights reserved.</p>
            <p className="mt-2">Ministry of Transport and Logistics</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
