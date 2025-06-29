"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Smartphone, Mail, Key, Fingerprint, CheckCircle, AlertCircle } from "lucide-react"

export function MultiFactorAuth() {
  const [step, setStep] = useState(1)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [mfaEnabled, setMfaEnabled] = useState(false)

  const authMethods = [
    {
      id: "sms",
      name: "SMS Verification",
      description: "Receive codes via SMS",
      icon: Smartphone,
      enabled: true,
      primary: true,
    },
    {
      id: "email",
      name: "Email Verification",
      description: "Receive codes via email",
      icon: Mail,
      enabled: true,
      primary: false,
    },
    {
      id: "authenticator",
      name: "Authenticator App",
      description: "Use Google Authenticator or similar",
      icon: Key,
      enabled: false,
      primary: false,
    },
    {
      id: "biometric",
      name: "Biometric Authentication",
      description: "Fingerprint or face recognition",
      icon: Fingerprint,
      enabled: false,
      primary: false,
    },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Multi-Factor Authentication</span>
          </CardTitle>
          <CardDescription>Secure your account with multiple verification methods</CardDescription>
        </CardHeader>
      </Card>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>Current security status and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${mfaEnabled ? "bg-green-100" : "bg-red-100"}`}>
                  {mfaEnabled ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">Multi-Factor Authentication</p>
                  <p className="text-sm text-gray-600">
                    {mfaEnabled ? "Your account is protected" : "Additional security recommended"}
                  </p>
                </div>
              </div>
              <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Available Authentication Methods</h4>
              {authMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <method.icon className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.primary && <Badge variant="default">Primary</Badge>}
                    <Badge variant={method.enabled ? "default" : "outline"}>
                      {method.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => setStep(2)} className="w-full">
              Configure Authentication Methods
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Phone Verification</CardTitle>
              <CardDescription>Verify your phone number for SMS authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value="+251-9-12-34-56-78" placeholder="+251-9-XX-XX-XX-XX" />
              </div>
              {!phoneVerified ? (
                <Button onClick={() => setPhoneVerified(true)} className="w-full">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Send Verification Code
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smsCode">Verification Code</Label>
                    <Input id="smsCode" placeholder="Enter 6-digit code" maxLength={6} />
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Phone number verified successfully</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Verification</CardTitle>
              <CardDescription>Verify your email address for backup authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value="user@example.com" placeholder="your.email@example.com" />
              </div>
              {!emailVerified ? (
                <Button onClick={() => setEmailVerified(true)} variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Verification Email
                </Button>
              ) : (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Email address verified successfully</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button onClick={() => setStep(3)} className="flex-1" disabled={!phoneVerified}>
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Setup Complete</CardTitle>
            <CardDescription>Your multi-factor authentication is now configured</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Authentication Setup Complete</h3>
              <p className="text-gray-600">Your account is now secured with multi-factor authentication</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Active Authentication Methods:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-green-600" />
                    <span className="text-sm">SMS to +251-9-12-34-56-78</span>
                  </div>
                  <Badge variant="default">Primary</Badge>
                </div>
                {emailVerified && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Email to user@example.com</span>
                    </div>
                    <Badge variant="secondary">Backup</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Important Security Tips:</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Keep your phone and email secure</li>
                <li>• Never share verification codes with anyone</li>
                <li>• Contact support if you lose access to your devices</li>
                <li>• Review your security settings regularly</li>
              </ul>
            </div>

            <Button onClick={() => setStep(1)} className="w-full">
              Return to Security Settings
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
