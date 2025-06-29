"use server"

import { telebirrAPI, type TelebirrPaymentRequest } from "@/lib/telebirr-api"
import { cbeBirrAPI, type CBEBirrPaymentRequest } from "@/lib/cbe-birr-api"

interface PaymentRequest {
  amount: number
  currency: string
  description: string
  vehicleId: string
  paymentType: "road_fee" | "inspection" | "registration" | "penalty"
  customerPhone?: string
  customerName?: string
  customerAccount?: string
}

interface PaymentResult {
  success: boolean
  transactionId?: string
  referenceNumber?: string
  paymentUrl?: string
  qrCode?: string
  deepLink?: string
  message: string
  errorCode?: string
}

export async function initiateTelebirrPayment(request: PaymentRequest): Promise<PaymentResult> {
  try {
    if (!request.customerPhone) {
      return {
        success: false,
        message: "Phone number is required for Telebirr payment",
        errorCode: "MISSING_PHONE",
      }
    }

    const orderId = `BOLO_${request.vehicleId}_${Date.now()}`

    const telebirrRequest: TelebirrPaymentRequest = {
      amount: request.amount,
      currency: request.currency,
      orderId,
      description: `${request.description} - Vehicle: ${request.vehicleId}`,
      customerPhone: request.customerPhone,
      customerName: request.customerName,
      metadata: {
        vehicleId: request.vehicleId,
        paymentType: request.paymentType,
        systemSource: "bolo_digital",
      },
    }

    const response = await telebirrAPI.initiatePayment(telebirrRequest)

    if (response.success) {
      // Store payment record in database
      await storePaymentRecord({
        orderId,
        transactionId: response.transactionId!,
        amount: request.amount,
        currency: request.currency,
        vehicleId: request.vehicleId,
        paymentType: request.paymentType,
        provider: "telebirr",
        status: "PENDING",
        customerPhone: request.customerPhone,
        customerName: request.customerName,
      })

      return {
        success: true,
        transactionId: response.transactionId,
        paymentUrl: response.paymentUrl,
        message: "Payment initiated successfully. Please complete payment on your Telebirr app.",
      }
    } else {
      return {
        success: false,
        message: response.message,
        errorCode: response.errorCode,
      }
    }
  } catch (error) {
    console.error("Telebirr payment initiation failed:", error)
    return {
      success: false,
      message: "Payment initiation failed. Please try again.",
      errorCode: "SYSTEM_ERROR",
    }
  }
}

export async function initiateCBEBirrPayment(request: PaymentRequest): Promise<PaymentResult> {
  try {
    if (!request.customerAccount) {
      return {
        success: false,
        message: "Account number is required for CBE Birr payment",
        errorCode: "MISSING_ACCOUNT",
      }
    }

    const referenceNumber = `CBE_${request.vehicleId}_${Date.now()}`

    const cbeRequest: CBEBirrPaymentRequest = {
      amount: request.amount,
      currency: request.currency,
      referenceNumber,
      description: `${request.description} - Vehicle: ${request.vehicleId}`,
      customerAccount: request.customerAccount,
      customerName: request.customerName,
      customerPhone: request.customerPhone,
      expiryMinutes: 30,
    }

    const response = await cbeBirrAPI.initiatePayment(cbeRequest)

    if (response.success) {
      // Store payment record in database
      await storePaymentRecord({
        orderId: referenceNumber,
        transactionId: response.transactionId!,
        amount: request.amount,
        currency: request.currency,
        vehicleId: request.vehicleId,
        paymentType: request.paymentType,
        provider: "cbe_birr",
        status: "PENDING",
        customerPhone: request.customerPhone,
        customerName: request.customerName,
        customerAccount: request.customerAccount,
      })

      return {
        success: true,
        transactionId: response.transactionId,
        referenceNumber: response.referenceNumber,
        qrCode: response.qrCode,
        deepLink: response.deepLink,
        message: "Payment initiated successfully. Please complete payment using CBE Birr app.",
      }
    } else {
      return {
        success: false,
        message: response.message,
        errorCode: response.errorCode,
      }
    }
  } catch (error) {
    console.error("CBE Birr payment initiation failed:", error)
    return {
      success: false,
      message: "Payment initiation failed. Please try again.",
      errorCode: "SYSTEM_ERROR",
    }
  }
}

export async function checkPaymentStatus(transactionId: string, provider: "telebirr" | "cbe_birr") {
  try {
    if (provider === "telebirr") {
      const status = await telebirrAPI.checkPaymentStatus(transactionId)

      // Update payment record in database
      await updatePaymentStatus(transactionId, status.status, status.paidAt)

      return {
        success: status.success,
        status: status.status,
        amount: status.amount,
        currency: status.currency,
        paidAt: status.paidAt,
        failureReason: status.failureReason,
      }
    } else {
      const status = await cbeBirrAPI.checkPaymentStatus(transactionId)

      // Update payment record in database
      await updatePaymentStatus(transactionId, status.status, status.completedAt)

      return {
        success: status.success,
        status: status.status,
        amount: status.amount,
        currency: status.currency,
        paidAt: status.completedAt,
        failureReason: status.failureReason,
      }
    }
  } catch (error) {
    console.error("Payment status check failed:", error)
    return {
      success: false,
      status: "FAILED",
      amount: 0,
      currency: "ETB",
      failureReason: "Status check failed",
    }
  }
}

// Mock database functions (replace with actual database operations)
async function storePaymentRecord(record: any) {
  // In real implementation, store in database
  console.log("Storing payment record:", record)
}

async function updatePaymentStatus(transactionId: string, status: string, completedAt?: string) {
  // In real implementation, update database record
  console.log("Updating payment status:", { transactionId, status, completedAt })
}

export type { PaymentRequest, PaymentResult }
