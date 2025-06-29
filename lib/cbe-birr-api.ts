interface CBEBirrConfig {
  merchantCode: string
  terminalId: string
  apiKey: string
  baseUrl: string
  callbackUrl: string
}

interface CBEBirrPaymentRequest {
  amount: number
  currency: string
  referenceNumber: string
  description: string
  customerAccount: string
  customerName?: string
  customerPhone?: string
  expiryMinutes?: number
}

interface CBEBirrPaymentResponse {
  success: boolean
  referenceNumber?: string
  transactionId?: string
  qrCode?: string
  deepLink?: string
  message: string
  errorCode?: string
}

interface CBEBirrStatusResponse {
  success: boolean
  status: "INITIATED" | "PENDING" | "COMPLETED" | "FAILED" | "EXPIRED"
  referenceNumber: string
  transactionId?: string
  amount: number
  currency: string
  completedAt?: string
  failureReason?: string
}

class CBEBirrAPI {
  private config: CBEBirrConfig

  constructor(config: CBEBirrConfig) {
    this.config = config
  }

  private async makeRequest(endpoint: string, data: any, method: "GET" | "POST" = "POST") {
    const url = `${this.config.baseUrl}${endpoint}`
    const timestamp = new Date().toISOString()
    const nonce = this.generateNonce()
    const signature = this.generateSignature(data, timestamp, nonce)

    const headers = {
      "Content-Type": "application/json",
      "X-Merchant-Code": this.config.merchantCode,
      "X-Terminal-ID": this.config.terminalId,
      "X-API-Key": this.config.apiKey,
      "X-Timestamp": timestamp,
      "X-Nonce": nonce,
      "X-Signature": signature,
      Accept: "application/json",
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`CBE Birr API error: ${response.status} - ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("CBE Birr API request failed:", error)
      throw error
    }
  }

  private generateNonce(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  private generateSignature(data: any, timestamp: string, nonce: string): string {
    // In real implementation, this would use HMAC-SHA256 with the merchant secret
    const payload = JSON.stringify(data) + timestamp + nonce + this.config.merchantCode
    // Simplified signature generation for demo
    return Buffer.from(payload).toString("base64")
  }

  async initiatePayment(request: CBEBirrPaymentRequest): Promise<CBEBirrPaymentResponse> {
    try {
      const payload = {
        merchant_code: this.config.merchantCode,
        terminal_id: this.config.terminalId,
        reference_number: request.referenceNumber,
        amount: request.amount,
        currency: request.currency,
        description: request.description,
        customer_account: request.customerAccount,
        customer_name: request.customerName,
        customer_phone: request.customerPhone,
        callback_url: this.config.callbackUrl,
        expiry_minutes: request.expiryMinutes || 30,
      }

      const response = await this.makeRequest("/payment/initiate", payload)

      if (response.response_code === "00") {
        return {
          success: true,
          referenceNumber: response.reference_number,
          transactionId: response.transaction_id,
          qrCode: response.qr_code,
          deepLink: response.deep_link,
          message: "Payment initiated successfully",
        }
      } else {
        return {
          success: false,
          message: response.response_message || "Payment initiation failed",
          errorCode: response.response_code,
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Network error occurred",
        errorCode: "NETWORK_ERROR",
      }
    }
  }

  async checkPaymentStatus(referenceNumber: string): Promise<CBEBirrStatusResponse> {
    try {
      const payload = {
        merchant_code: this.config.merchantCode,
        reference_number: referenceNumber,
      }

      const response = await this.makeRequest("/payment/inquiry", payload)

      return {
        success: true,
        status: this.mapStatus(response.transaction_status),
        referenceNumber: response.reference_number,
        transactionId: response.transaction_id,
        amount: response.amount,
        currency: response.currency,
        completedAt: response.completed_at,
        failureReason: response.failure_reason,
      }
    } catch (error) {
      return {
        success: false,
        status: "FAILED",
        referenceNumber,
        amount: 0,
        currency: "ETB",
        failureReason: "Status inquiry failed",
      }
    }
  }

  private mapStatus(status: string): CBEBirrStatusResponse["status"] {
    switch (status) {
      case "01":
        return "INITIATED"
      case "02":
        return "PENDING"
      case "00":
        return "COMPLETED"
      case "03":
        return "FAILED"
      case "04":
        return "EXPIRED"
      default:
        return "FAILED"
    }
  }

  async reversePayment(referenceNumber: string): Promise<CBEBirrPaymentResponse> {
    try {
      const payload = {
        merchant_code: this.config.merchantCode,
        original_reference: referenceNumber,
        reversal_reason: "Customer requested reversal",
      }

      const response = await this.makeRequest("/payment/reverse", payload)

      return {
        success: response.response_code === "00",
        referenceNumber: response.reversal_reference,
        message: response.response_message,
        errorCode: response.response_code,
      }
    } catch (error) {
      return {
        success: false,
        message: "Reversal request failed",
        errorCode: "REVERSAL_ERROR",
      }
    }
  }
}

// Initialize CBE Birr API
export const cbeBirrAPI = new CBEBirrAPI({
  merchantCode: process.env.CBE_MERCHANT_CODE || "BOLO001",
  terminalId: process.env.CBE_TERMINAL_ID || "TERM001",
  apiKey: process.env.CBE_API_KEY || "test_cbe_key",
  baseUrl: process.env.CBE_BASE_URL || "https://api.cbebirr.et/v2",
  callbackUrl: process.env.CBE_CALLBACK_URL || "https://bolo.gov.et/api/cbe/callback",
})

export type { CBEBirrPaymentRequest, CBEBirrPaymentResponse, CBEBirrStatusResponse }
