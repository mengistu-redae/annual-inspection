import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: "Online Appointment Booking",
      description: "Schedule vehicle inspections at authorized centers across Ethiopia",
    },
    {
      icon: CreditCard,
      title: "Digital Payment Integration",
      description: "Pay road use fees, penalties, and service charges online",
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Digital certificates, registration cards, and document storage",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "SMS/Email reminders for renewals and appointments",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Real-time insights for government partners and stakeholders",
    },
    {
      icon: Users,
      title: "Multi-Stakeholder Platform",
      description: "Unified system for citizens, inspection centers, and authorities",
    },
  ]

  const stakeholders = [
    {
      icon: Users,
      title: "Vehicle Owners",
      description: "Citizens managing their vehicle registration and inspection",
      color: "bg-blue-500",
    },
    {
      icon: Building2,
      title: "Inspection Centers",
      description: "Authorized centers conducting technical inspections",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Transport Authority",
      description: "Federal and regional transport bureaus",
      color: "bg-purple-500",
    },
    {
      icon: Car,
      title: "Insurance Companies",
      description: "Third-party insurance providers",
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ቦሎ Digital</h1>
                <p className="text-sm text-gray-600">Vehicle Registration System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Government Approved
              </Badge>
              <Link href="/dashboard">
                <Button>Access Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Modernizing Ethiopia's Vehicle Registration</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive digital platform streamlining the annual vehicle inspection and registration process (ቦሎ)
              through public-private partnership, serving all stakeholders with efficiency and transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-3">
                  Get Started
                </Button>
              </Link>
              <Link href="/book-appointment">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  Book Inspection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Complete Lifecycle Management</h3>
            <p className="text-lg text-gray-600">From insurance renewal to final registration - all in one platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Insurance Renewal", desc: "Third-party insurance verification" },
              { step: "2", title: "Technical Inspection", desc: "Comprehensive vehicle safety check" },
              { step: "3", title: "Fee Payment", desc: "Road use tax and penalty settlement" },
              { step: "4", title: "Registration Update", desc: "Blue card renewal and documentation" },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h3>
            <p className="text-lg text-gray-600">Comprehensive digital solutions for modern vehicle registration</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Multi-Stakeholder Platform</h3>
            <p className="text-lg text-gray-600">Serving all participants in the vehicle registration ecosystem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stakeholders.map((stakeholder, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${stakeholder.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <stakeholder.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{stakeholder.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{stakeholder.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h3 className="text-4xl font-bold mb-6">Ready to Digitize Your Vehicle Registration?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Ethiopian vehicle owners who have simplified their registration process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  Access Dashboard
                </Button>
              </Link>
              <Link href="/book-appointment">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">ቦሎ Digital</span>
              </div>
              <p className="text-gray-400">
                Modernizing Ethiopia's vehicle registration through digital innovation and public-private partnership.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Vehicle Inspection</li>
                <li>Registration Renewal</li>
                <li>Payment Processing</li>
                <li>Document Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stakeholders</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Vehicle Owners</li>
                <li>Inspection Centers</li>
                <li>Transport Authority</li>
                <li>Insurance Companies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>System Status</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ቦሎ Digital Platform. All rights reserved. | Government of Ethiopia Partnership</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
