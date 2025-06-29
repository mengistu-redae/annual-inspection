interface TelebirrConfig {
  merchantId: string
  apiKey: string
  baseUrl: string
  notifyUrl: string
  returnUrl: string
}

interface TelebirrPaymentRequest {
  amount: number
  currency: string
  orderId: string
  description: string
  customerPhone: string
  customerName?: string
  metadata?: Record<string, any>
}

interface TelebirrPaymentResponse {
  success: boolean
  transactionId?: string
  paymentUrl?: string
  message: string
  errorCode?: string
}

interface TelebirrStatusResponse {
  success: boolean
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED"
  transactionId: string
  amount: number
  currency: string
  paidAt?: string
  failureReason?: string
}

class TelebirrAPI {
  private config: TelebirrConfig

  constructor(config: TelebirrConfig) {
    this.config = config
  }

  private async makeRequest(endpoint: string, data: any, method: "GET" | "POST" = "POST") {
    const url = `${this.config.baseUrl}${endpoint}`
    const timestamp = Date.now().toString()
    const signature = this.generateSignature(data, timestamp)

    const headers = {
      "Content-Type": "application/json",
      "X-Merchant-ID": this.config.merchantId,
      "X-API-Key": this.config.apiKey,
      "X-Timestamp": timestamp,
      "X-Signature": signature,
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: method === "POST" ? JSON.stringify(data) : undefined,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Telebirr API request failed:", error)
      throw error
    }
  }

  private generateSignature(data: any, timestamp: string): string {
    // In real implementation, this would use HMAC-SHA256 with the API secret
    const payload = JSON.stringify(data) + timestamp + this.config.merchantId
    // Simplified signature generation for demo
    return Buffer.from(payload).toString("base64")
  }

  async initiatePayment(request: TelebirrPaymentRequest): Promise<TelebirrPaymentResponse> {
    try {
      const payload = {
        merchant_id: this.config.merchantId,
        order_id: request.orderId,
        amount: request.amount,
        currency: request.currency,
        description: request.description,
        customer_phone: request.customerPhone,
        customer_name: request.customerName,
        notify_url: this.config.notifyUrl,
        return_url: this.config.returnUrl,
        metadata: request.metadata,
      }

      const response = await this.makeRequest("/payment/initiate", payload)

      if (response.status === "SUCCESS") {
        return {
          success: true,
          transactionId: response.transaction_id,
          paymentUrl: response.payment_url,
          message: "Payment initiated successfully",
        }
      } else {
        return {
          success: false,
          message: response.message || "Payment initiation failed",
          errorCode: response.error_code,
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

  async checkPaymentStatus(transactionId: string): Promise<TelebirrStatusResponse> {
    try {
      const response = await this.makeRequest(`/payment/status/${transactionId}`, {}, "GET")

      return {
        success: true,
        status: response.status,
        transactionId: response.transaction_id,
        amount: response.amount,
        currency: response.currency,
        paidAt: response.paid_at,
        failureReason: response.failure_reason,
      }
    } catch (error) {
      return {
        success: false,
        status: "FAILED",
        transactionId,
        amount: 0,
        currency: "ETB",
        failureReason: "Status check failed",
      }
    }
  }

  async refundPayment(transactionId: string, amount?: number): Promise<TelebirrPaymentResponse> {
    try {
      const payload = {
        transaction_id: transactionId,
        amount: amount, // If not provided, full refund
        reason: "Customer requested refund",
      }

      const response = await this.makeRequest("/payment/refund", payload)

      return {
        success: response.status === "SUCCESS",
        transactionId: response.refund_id,
        message: response.message,
        errorCode: response.error_code,
      }
    } catch (error) {
      return {
        success: false,
        message: "Refund request failed",
        errorCode: "REFUND_ERROR",
      }
    }
  }
}

// Initialize Telebirr API
export const telebirrAPI = new TelebirrAPI({
  merchantId: process.env.TELEBIRR_MERCHANT_ID || "BOLO_DIGITAL_001",
  apiKey: process.env.TELEBIRR_API_KEY || "test_api_key",
  baseUrl: process.env.TELEBIRR_BASE_URL || "https://api.telebirr.et/v1",
  notifyUrl: process.env.TELEBIRR_NOTIFY_URL || "https://bolo.gov.et/api/telebirr/notify",
  returnUrl: process.env.TELEBIRR_RETURN_URL || "https://bolo.gov.et/payment/success",
})

export type { TelebirrPaymentRequest, TelebirrPaymentResponse, TelebirrStatusResponse }
