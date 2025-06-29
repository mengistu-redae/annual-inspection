import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook signature (implement proper signature verification)
    const signature = request.headers.get("x-signature")
    if (!verifyTelebirrSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Process the payment notification
    const { transaction_id, order_id, status, amount, currency, paid_at, customer_phone } = body

    // Update payment status in database
    await updatePaymentStatus(transaction_id, status, paid_at)

    // Send confirmation SMS to customer
    if (status === "SUCCESS") {
      await sendPaymentConfirmationSMS(customer_phone, {
        transactionId: transaction_id,
        amount,
        currency,
      })
    }

    // Log the transaction
    console.log("Telebirr payment notification:", {
      transactionId: transaction_id,
      orderId: order_id,
      status,
      amount,
      currency,
    })

    return NextResponse.json({ status: "success" })
  } catch (error) {
    console.error("Telebirr webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

function verifyTelebirrSignature(body: any, signature: string | null): boolean {
  // Implement proper HMAC-SHA256 signature verification
  // This is a simplified version for demo purposes
  return signature !== null
}

async function updatePaymentStatus(transactionId: string, status: string, paidAt?: string) {
  // Update database record
  console.log("Updating payment status:", { transactionId, status, paidAt })
}

async function sendPaymentConfirmationSMS(phone: string, details: any) {
  // Send SMS confirmation
  console.log("Sending SMS confirmation to:", phone, details)
}
