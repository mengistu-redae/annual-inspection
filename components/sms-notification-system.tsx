"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Phone, CheckCircle, Clock, AlertCircle, Send } from "lucide-react"

export function SMSNotificationSystem() {
  const [phoneNumber, setPhoneNumber] = useState("+251-9-12-34-56-78")
  const [notifications, setNotifications] = useState({
    appointments: true,
    payments: true,
    renewals: true,
    documents: true,
    emergencies: true,
  })

  const smsHistory = [
    {
      id: "SMS-001",
      type: "Appointment Reminder",
      message:
        "Your vehicle inspection is scheduled for tomorrow at 10:00 AM at Addis Central Center. Booking ID: BK-2024-001234",
      phone: "+251-9-12-34-56-78",
      status: "delivered",
      timestamp: "2024-01-14 16:30",
      language: "en",
    },
    {
      id: "SMS-002",
      type: "Payment Confirmation",
      message: "የክፍያዎ ተረጋግጧል። መጠን: ብር 850። ግብይት መለያ: TXN-2024-001234",
      phone: "+251-9-12-34-56-78",
      status: "delivered",
      timestamp: "2024-01-13 14:22",
      language: "am",
    },
    {
      id: "SMS-003",
      type: "Renewal Alert",
      message: "Your vehicle registration (ET-1234-AA) expires in 7 days. Renew now to avoid penalties.",
      phone: "+251-9-12-34-56-78",
      status: "pending",
      timestamp: "2024-01-12 09:15",
      language: "en",
    },
  ]

  const ussdCodes = [
    { code: "*847*1#", description: "Check vehicle status", usage: "High" },
    { code: "*847*2#", description: "Book appointment", usage: "Medium" },
    { code: "*847*3#", description: "Pay fees", usage: "High" },
    { code: "*847*4#", description: "Get documents", usage: "Low" },
    { code: "*847*0#", description: "Help menu", usage: "Medium" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>SMS Notification Center</span>
          </CardTitle>
          <CardDescription>Manage SMS notifications and USSD services for all users</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="history">SMS History</TabsTrigger>
          <TabsTrigger value="ussd">USSD Codes</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phone Number Settings</CardTitle>
                <CardDescription>Configure your primary phone number for notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Primary Phone Number</Label>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+251-9-XX-XX-XX-XX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup">Backup Phone Number (Optional)</Label>
                  <Input id="backup" placeholder="+251-9-XX-XX-XX-XX" />
                </div>
                <Button className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Verify Phone Numbers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose which notifications you want to receive via SMS</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
                      <p className="text-sm text-gray-600">
                        {key === "appointments" && "Booking confirmations and reminders"}
                        {key === "payments" && "Payment confirmations and receipts"}
                        {key === "renewals" && "Registration and inspection renewals"}
                        {key === "documents" && "Document ready notifications"}
                        {key === "emergencies" && "Urgent system alerts"}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>SMS History</CardTitle>
              <CardDescription>Track all SMS notifications sent to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smsHistory.map((sms) => (
                  <div key={sms.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div
                      className={`p-2 rounded-full ${
                        sms.status === "delivered"
                          ? "bg-green-100"
                          : sms.status === "pending"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                      }`}
                    >
                      {sms.status === "delivered" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : sms.status === "pending" ? (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{sms.type}</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{sms.language.toUpperCase()}</Badge>
                          <Badge
                            variant={
                              sms.status === "delivered"
                                ? "default"
                                : sms.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {sms.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{sms.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{sms.phone}</span>
                        <span>{sms.timestamp}</span>
                        <span>ID: {sms.id}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ussd">
          <Card>
            <CardHeader>
              <CardTitle>USSD Code Management</CardTitle>
              <CardDescription>Manage USSD codes for feature phone users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ussdCodes.map((ussd, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="font-mono text-lg font-bold text-blue-600">{ussd.code}</div>
                      <div>
                        <p className="font-medium">{ussd.description}</p>
                        <p className="text-sm text-gray-600">Usage: {ussd.usage}</p>
                      </div>
                    </div>
                    <Badge
                      variant={ussd.usage === "High" ? "default" : ussd.usage === "Medium" ? "secondary" : "outline"}
                    >
                      {ussd.usage}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">How to Use USSD Codes:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Dial the USSD code on any phone</li>
                  <li>2. Follow the menu prompts</li>
                  <li>3. Complete your transaction</li>
                  <li>4. Receive SMS confirmation</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcast">
          <Card>
            <CardHeader>
              <CardTitle>Broadcast Messages</CardTitle>
              <CardDescription>Send bulk SMS notifications to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Users</option>
                    <option>Vehicle Owners</option>
                    <option>Inspection Centers</option>
                    <option>Overdue Renewals</option>
                    <option>Specific Region</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>English</option>
                    <option>Amharic</option>
                    <option>Both Languages</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Message Content</Label>
                <textarea className="w-full p-3 border rounded-md h-24" placeholder="Enter your broadcast message..." />
                <p className="text-sm text-gray-600">Character count: 0/160</p>
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
