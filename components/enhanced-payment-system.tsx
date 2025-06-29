"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Smartphone,
  Building2,
  CreditCard,
  Coins,
  QrCode,
  Users,
  Calendar,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { initiateTelebirrPayment, initiateCBEBirrPayment, checkPaymentStatus } from "@/app/actions/payment-actions"
import type { PaymentRequest, PaymentResult } from "@/app/actions/payment-actions"

export function EnhancedPaymentSystem() {
  const [selectedMethod, setSelectedMethod] = useState("")
  const [installmentPlan, setInstallmentPlan] = useState(false)
  const [paymentForm, setPaymentForm] = useState({
    customerPhone: "",
    customerName: "",
    customerAccount: "",
    amount: 900,
    vehicleId: "ET-1234-AA",
    description: "Road Use Fee Payment",
  })
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<string>("")
  const [isPending, startTransition] = useTransition()

  const paymentMethods = [
    {
      id: "telebirr",
      name: "Telebirr",
      description: "Ethiopia's leading mobile money",
      icon: Smartphone,
      fee: "Free",
      processingTime: "Instant",
      popularity: "Most Popular",
      features: ["USSD Support", "Offline Capable", "Wide Coverage"],
      apiIntegrated: true,
    },
    {
      id: "cbe-birr",
      name: "CBE Birr",
      description: "Commercial Bank of Ethiopia",
      icon: Building2,
      fee: "ETB 5",
      processingTime: "Instant",
      popularity: "Popular",
      features: ["Bank Integration", "Account Linking", "Transaction History"],
      apiIntegrated: true,
    },
    {
      id: "awash-bank",
      name: "Awash Bank Mobile",
      description: "Awash Bank digital wallet",
      icon: Building2,
      fee: "ETB 3",
      processingTime: "Instant",
      popularity: "Growing",
      features: ["Mobile Banking", "QR Payments", "Bill Pay"],
      apiIntegrated: false,
    },
    {
      id: "dashen-bank",
      name: "Dashen Bank",
      description: "Dashen mobile banking",
      icon: Building2,
      fee: "ETB 7",
      processingTime: "1-2 minutes",
      popularity: "Available",
      features: ["Internet Banking", "Mobile App", "USSD"],
      apiIntegrated: false,
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "Bitcoin, Ethereum for diaspora",
      icon: Coins,
      fee: "Network fees apply",
      processingTime: "10-30 minutes",
      popularity: "Diaspora",
      features: ["Global Access", "No Bank Required", "Stable Coins"],
      apiIntegrated: false,
    },
    {
      id: "qr-cash",
      name: "QR Code + Cash",
      description: "Scan and pay at agent locations",
      icon: QrCode,
      fee: "ETB 10",
      processingTime: "Instant",
      popularity: "Rural Areas",
      features: ["No Internet Required", "Agent Network", "Cash Accepted"],
      apiIntegrated: false,
    },
  ]

  const installmentOptions = [
    { months: 3, monthlyAmount: 300, totalFee: 50, description: "3 monthly payments" },
    { months: 6, monthlyAmount: 158, totalFee: 100, description: "6 monthly payments" },
    { months: 12, monthlyAmount: 83, totalFee: 200, description: "12 monthly payments" },
  ]

  const groupPaymentFeatures = [
    "Split costs among fleet owners",
    "Bulk payment discounts",
    "Centralized billing",
    "Group payment tracking",
    "Corporate account integration",
  ]

  const handlePayment = async () => {
    if (!selectedMethod) {
      setPaymentResult({
        success: false,
        message: "Please select a payment method",
        errorCode: "NO_METHOD_SELECTED",
      })
      return
    }

    const paymentRequest: PaymentRequest = {
      amount: paymentForm.amount,
      currency: "ETB",
      description: paymentForm.description,
      vehicleId: paymentForm.vehicleId,
      paymentType: "road_fee",
      customerPhone: paymentForm.customerPhone,
      customerName: paymentForm.customerName,
      customerAccount: paymentForm.customerAccount,
    }

    startTransition(async () => {
      try {
        let result: PaymentResult

        if (selectedMethod === "telebirr") {
          result = await initiateTelebirrPayment(paymentRequest)
        } else if (selectedMethod === "cbe-birr") {
          result = await initiateCBEBirrPayment(paymentRequest)
        } else {
          result = {
            success: false,
            message: "This payment method is not yet integrated with live APIs",
            errorCode: "METHOD_NOT_INTEGRATED",
          }
        }

        setPaymentResult(result)

        // If payment was initiated successfully, start checking status
        if (result.success && result.transactionId) {
          setTimeout(() => {
            checkStatus(result.transactionId!, selectedMethod as "telebirr" | "cbe_birr")
          }, 5000) // Check status after 5 seconds
        }
      } catch (error) {
        setPaymentResult({
          success: false,
          message: "An unexpected error occurred",
          errorCode: "UNEXPECTED_ERROR",
        })
      }
    })
  }

  const checkStatus = async (transactionId: string, provider: "telebirr" | "cbe_birr") => {
    try {
      const status = await checkPaymentStatus(transactionId, provider)
      setPaymentStatus(status.status)

      // Continue checking if payment is still pending
      if (status.status === "PENDING" || status.status === "INITIATED") {
        setTimeout(() => {
          checkStatus(transactionId, provider)
        }, 10000) // Check again after 10 seconds
      }
    } catch (error) {
      console.error("Status check failed:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Enhanced Payment System</span>
            <Badge variant="secondary">Live API Integration</Badge>
          </CardTitle>
          <CardDescription>Real-time integration with Ethiopian payment providers</CardDescription>
        </CardHeader>
      </Card>

      {paymentResult && (
        <Alert variant={paymentResult.success ? "default" : "destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {paymentResult.message}
            {paymentResult.transactionId && (
              <div className="mt-2">
                <strong>Transaction ID:</strong> {paymentResult.transactionId}
              </div>
            )}
            {paymentStatus && (
              <div className="mt-2">
                <strong>Status:</strong> {paymentStatus}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="installments">Installment Plans</TabsTrigger>
          <TabsTrigger value="group">Group Payments</TabsTrigger>
          <TabsTrigger value="offline">Offline Options</TabsTrigger>
        </TabsList>

        <TabsContent value="methods">
          <div className="grid gap-6">
            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input
                      id="customerName"
                      value={paymentForm.customerName}
                      onChange={(e) => setPaymentForm((prev) => ({ ...prev, customerName: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicleId">Vehicle ID</Label>
                    <Input
                      id="vehicleId"
                      value={paymentForm.vehicleId}
                      onChange={(e) => setPaymentForm((prev) => ({ ...prev, vehicleId: e.target.value }))}
                      placeholder="ET-1234-AA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Phone Number (for Telebirr)</Label>
                    <Input
                      id="customerPhone"
                      value={paymentForm.customerPhone}
                      onChange={(e) => setPaymentForm((prev) => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="+251912345678"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerAccount">Account Number (for CBE Birr)</Label>
                    <Input
                      id="customerAccount"
                      value={paymentForm.customerAccount}
                      onChange={(e) => setPaymentForm((prev) => ({ ...prev, customerAccount: e.target.value }))}
                      placeholder="1000123456789"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (ETB)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: Number(e.target.value) }))}
                    placeholder="900"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedMethod === method.id ? "ring-2 ring-blue-600 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <method.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{method.name}</h3>
                          {method.popularity === "Most Popular" && <Badge variant="default">Most Popular</Badge>}
                          {method.popularity === "Diaspora" && <Badge variant="secondary">Diaspora</Badge>}
                          {method.apiIntegrated && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Live API
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{method.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Fee: </span>
                            <span className="text-green-600">{method.fee}</span>
                          </div>
                          <div>
                            <span className="font-medium">Processing: </span>
                            <span>{method.processingTime}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-medium mb-2">Features:</p>
                          <div className="flex flex-wrap gap-2">
                            {method.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant={selectedMethod === method.id ? "default" : "outline"} size="sm">
                        {selectedMethod === method.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Payment Button */}
            <Card>
              <CardContent className="p-6">
                <Button onClick={handlePayment} disabled={!selectedMethod || isPending} className="w-full" size="lg">
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ETB ${paymentForm.amount} via ${paymentMethods.find((m) => m.id === selectedMethod)?.name || "Selected Method"}`
                  )}
                </Button>

                {paymentResult?.qrCode && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">Scan QR Code with CBE Birr App:</p>
                    <div className="inline-block p-4 bg-white border rounded-lg">
                      <QrCode className="h-32 w-32 mx-auto" />
                      <p className="text-xs mt-2">QR Code would appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="installments">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Installment Payment Plans</CardTitle>
                <CardDescription>Break down large payments into manageable amounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Total Amount: ETB 900</h4>
                  <p className="text-sm text-blue-800">Road use fee + penalties for ET-1234-AA</p>
                </div>

                {installmentOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      installmentPlan ? "border-blue-600 bg-blue-50" : "hover:border-gray-300"
                    }`}
                    onClick={() => setInstallmentPlan(true)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{option.description}</p>
                        <p className="text-sm text-gray-600">ETB {option.monthlyAmount}/month</p>
                        <p className="text-xs text-gray-500">Processing fee: ETB {option.totalFee}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">ETB {option.monthlyAmount}</p>
                        <p className="text-xs text-gray-500">per month</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full" disabled={!installmentPlan}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Setup Installment Plan
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Schedule</CardTitle>
                <CardDescription>Your upcoming installment payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: "Feb 15, 2024", amount: 300, status: "upcoming" },
                    { date: "Mar 15, 2024", amount: 300, status: "scheduled" },
                    { date: "Apr 15, 2024", amount: 300, status: "scheduled" },
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            payment.status === "upcoming" ? "bg-blue-500" : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{payment.date}</p>
                          <p className="text-sm text-gray-600">Payment {index + 1} of 3</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">ETB {payment.amount}</p>
                        <Badge variant={payment.status === "upcoming" ? "default" : "outline"}>{payment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Auto-pay enabled via Telebirr
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="group">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Payment Options</CardTitle>
                <CardDescription>Perfect for fleet owners and organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {groupPaymentFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">Volume Discounts:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• 5-10 vehicles: 5% discount</li>
                    <li>• 11-25 vehicles: 10% discount</li>
                    <li>• 25+ vehicles: 15% discount</li>
                  </ul>
                </div>

                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Create Group Payment
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Group Payments</CardTitle>
                <CardDescription>Manage your group payment accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Addis Taxi Fleet",
                      vehicles: 15,
                      totalAmount: 12750,
                      discount: 1275,
                      status: "active",
                    },
                    {
                      name: "Logistics Company Ltd",
                      vehicles: 8,
                      totalAmount: 6800,
                      discount: 340,
                      status: "pending",
                    },
                  ].map((group, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{group.name}</h4>
                        <Badge variant={group.status === "active" ? "default" : "secondary"}>{group.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Vehicles: </span>
                          <span className="font-medium">{group.vehicles}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Total: </span>
                          <span className="font-medium">ETB {group.totalAmount.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Discount: </span>
                          <span className="font-medium text-green-600">ETB {group.discount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Final: </span>
                          <span className="font-bold">ETB {(group.totalAmount - group.discount).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="offline">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>USSD Payment Codes</CardTitle>
                <CardDescription>Pay using any phone, no internet required</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">How to Pay via USSD:</h4>
                  <ol className="text-sm text-blue-800 space-y-2">
                    <li>
                      1. Dial <strong>*847*3#</strong> on any phone
                    </li>
                    <li>2. Enter your vehicle plate number</li>
                    <li>3. Select payment amount</li>
                    <li>4. Choose payment method</li>
                    <li>5. Confirm with PIN</li>
                    <li>6. Receive SMS confirmation</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  {[
                    { code: "*847*3*1#", description: "Pay road use fee", usage: "Most Used" },
                    { code: "*847*3*2#", description: "Pay inspection fee", usage: "Popular" },
                    { code: "*847*3*3#", description: "Pay penalties", usage: "Common" },
                    { code: "*847*3*0#", description: "Payment help menu", usage: "Support" },
                  ].map((ussd, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-mono font-bold text-blue-600">{ussd.code}</p>
                        <p className="text-sm text-gray-600">{ussd.description}</p>
                      </div>
                      <Badge variant="outline">{ussd.usage}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Network Payments</CardTitle>
                <CardDescription>Pay through local agents with cash</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Find Nearby Agents:</h4>
                  <div className="space-y-2">
                    <Input placeholder="Enter your location or kebele" />
                    <Button className="w-full">
                      <QrCode className="h-4 w-4 mr-2" />
                      Find Agents Near Me
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: "Abebe Kebede",
                      location: "Bole, Addis Ababa",
                      distance: "0.5 km",
                      rating: 4.8,
                      services: ["Cash Payment", "Document Pickup"],
                    },
                    {
                      name: "Almaz Tadesse",
                      location: "Kirkos, Addis Ababa",
                      distance: "1.2 km",
                      rating: 4.9,
                      services: ["Cash Payment", "Mobile Money"],
                    },
                  ].map((agent, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{agent.name}</h4>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm">★ {agent.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {agent.location} • {agent.distance}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {agent.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
