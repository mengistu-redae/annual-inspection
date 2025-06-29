"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Car,
  CreditCard,
  Smartphone,
  Building2,
  Receipt,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import { EnhancedPaymentSystem } from "@/components/enhanced-payment-system"

export default function PaymentsPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [paymentStep, setPaymentStep] = useState(1)

  const pendingPayments = [
    {
      id: "1",
      type: "Road Use Fee",
      vehicle: "ET-1234-AA",
      amount: 850,
      dueDate: "2024-02-15",
      penalty: 50,
      status: "overdue",
    },
    {
      id: "2",
      type: "Inspection Fee",
      vehicle: "ET-5678-BB",
      amount: 500,
      dueDate: "2024-02-20",
      penalty: 0,
      status: "due",
    },
    {
      id: "3",
      type: "Registration Renewal",
      vehicle: "ET-1234-AA",
      amount: 300,
      dueDate: "2024-02-25",
      penalty: 0,
      status: "upcoming",
    },
  ]

  const paymentHistory = [
    {
      id: "PAY-001",
      type: "Road Use Fee",
      vehicle: "ET-9012-CC",
      amount: 800,
      date: "2024-01-15",
      method: "Telebirr",
      status: "completed",
    },
    {
      id: "PAY-002",
      type: "Inspection Fee",
      vehicle: "ET-9012-CC",
      amount: 500,
      date: "2024-01-10",
      method: "CBE Birr",
      status: "completed",
    },
    {
      id: "PAY-003",
      type: "Late Penalty",
      vehicle: "ET-3456-DD",
      amount: 100,
      date: "2024-01-05",
      method: "Bank Transfer",
      status: "completed",
    },
  ]

  const handlePayment = () => {
    setPaymentStep(3)
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep(4)
    }, 2000)
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Center</h1>
            <p className="text-gray-600">Manage your vehicle-related payments and fees</p>
          </div>

          <Tabs defaultValue="pending" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending Payments</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
              <TabsTrigger value="enhanced">Enhanced Options</TabsTrigger>
              <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
            </TabsList>

            {/* Pending Payments */}
            <TabsContent value="pending">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Outstanding Payments</CardTitle>
                    <CardDescription>Payments due for your registered vehicles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                payment.status === "overdue"
                                  ? "bg-red-500"
                                  : payment.status === "due"
                                    ? "bg-yellow-500"
                                    : "bg-blue-500"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{payment.type}</p>
                              <p className="text-sm text-gray-600">{payment.vehicle}</p>
                              <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <div>
                                <p className="font-bold">₹{payment.amount}</p>
                                {payment.penalty > 0 && (
                                  <p className="text-sm text-red-600">+₹{payment.penalty} penalty</p>
                                )}
                              </div>
                              <Badge
                                variant={
                                  payment.status === "overdue"
                                    ? "destructive"
                                    : payment.status === "due"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </div>
                            <Button size="sm" className="mt-2">
                              Pay Now
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
                      <DollarSign className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-red-600">₹1,700</div>
                      <p className="text-xs text-gray-600">Including penalties</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">₹900</div>
                      <p className="text-xs text-gray-600">Immediate attention required</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Next Due</CardTitle>
                      <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">5 days</div>
                      <p className="text-xs text-gray-600">Inspection fee due</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Payment History */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Your completed payment transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">{payment.type}</p>
                            <p className="text-sm text-gray-600">{payment.vehicle}</p>
                            <p className="text-xs text-gray-500">
                              {payment.date} • {payment.method}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">₹{payment.amount}</p>
                          <p className="text-xs text-gray-500">ID: {payment.id}</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            <Receipt className="h-3 w-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enhanced Payment Options */}
            <TabsContent value="enhanced">
              <EnhancedPaymentSystem />
            </TabsContent>

            {/* Make Payment */}
            <TabsContent value="make-payment">
              {paymentStep === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Payment Method</CardTitle>
                      <CardDescription>Choose your preferred payment option</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          id: "telebirr",
                          name: "Telebirr",
                          description: "Ethiopia's leading mobile money",
                          icon: Smartphone,
                          fee: "Free",
                        },
                        {
                          id: "cbe-birr",
                          name: "CBE Birr",
                          description: "Commercial Bank of Ethiopia mobile app",
                          icon: Smartphone,
                          fee: "₹5",
                        },
                        {
                          id: "bank-transfer",
                          name: "Bank Transfer",
                          description: "Direct bank account transfer",
                          icon: Building2,
                          fee: "₹10",
                        },
                        {
                          id: "credit-card",
                          name: "Credit/Debit Card",
                          description: "Visa, Mastercard accepted",
                          icon: CreditCard,
                          fee: "2.5%",
                        },
                      ].map((method) => (
                        <div
                          key={method.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedPaymentMethod === method.id ? "border-blue-600 bg-blue-50" : "hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="h-6 w-6 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-medium">{method.name}</p>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">Fee: {method.fee}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Summary</CardTitle>
                      <CardDescription>Review your payment details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Road Use Fee (ET-1234-AA)</span>
                          <span>₹850</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>Late Penalty</span>
                          <span>₹50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Fee</span>
                          <span>₹10</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount</span>
                            <span>₹910</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => setPaymentStep(2)} disabled={!selectedPaymentMethod}>
                        Proceed to Payment
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {paymentStep === 2 && (
                <Card className="max-w-md mx-auto">
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Enter your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedPaymentMethod === "telebirr" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="+251-9-12-34-56-78" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pin">Telebirr PIN</Label>
                          <Input id="pin" type="password" placeholder="Enter your PIN" />
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "cbe-birr" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="account">Account Number</Label>
                          <Input id="account" placeholder="1000123456789" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pin">CBE Birr PIN</Label>
                          <Input id="pin" type="password" placeholder="Enter your PIN" />
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "bank-transfer" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bank">Select Bank</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cbe">Commercial Bank of Ethiopia</SelectItem>
                              <SelectItem value="awash">Awash Bank</SelectItem>
                              <SelectItem value="dashen">Dashen Bank</SelectItem>
                              <SelectItem value="boa">Bank of Abyssinia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account">Account Number</Label>
                          <Input id="account" placeholder="Enter account number" />
                        </div>
                      </div>
                    )}

                    {selectedPaymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Cardholder Name</Label>
                          <Input id="name" placeholder="Full name on card" />
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button variant="outline" onClick={() => setPaymentStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handlePayment} className="flex-1">
                        Pay ₹910
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {paymentStep === 3 && (
                <Card className="max-w-md mx-auto">
                  <CardContent className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
                    <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
                    <p className="text-gray-600">Please wait while we process your payment...</p>
                  </CardContent>
                </Card>
              )}

              {paymentStep === 4 && (
                <Card className="max-w-md mx-auto">
                  <CardContent className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Transaction ID:</span>
                          <span className="font-medium">TXN-2024-001234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount Paid:</span>
                          <span className="font-medium">₹910</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Method:</span>
                          <span className="font-medium">Telebirr</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span className="font-medium">Jan 15, 2024</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button className="w-full">
                        <Receipt className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full bg-transparent">
                          Return to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
