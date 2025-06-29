import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook signature
    const signature = request.headers.get("x-signature")
    if (!verifyCBESignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Process the payment callback
    const { reference_number, transaction_id, transaction_status, amount, currency, completed_at, customer_account } =
      body

    // Map CBE status to our internal status
    const internalStatus = mapCBEStatus(transaction_status)

    // Update payment status in database
    await updatePaymentStatus(transaction_id, internalStatus, completed_at)

    // Send confirmation if payment successful
    if (internalStatus === "SUCCESS") {
      await sendPaymentConfirmationSMS(customer_account, {
        transactionId: transaction_id,
        referenceNumber: reference_number,
        amount,
        currency,
      })
    }

    // Log the transaction
    console.log("CBE Birr payment callback:", {
      referenceNumber: reference_number,
      transactionId: transaction_id,
      status: internalStatus,
      amount,
      currency,
    })

    return NextResponse.json({
      response_code: "00",
      response_message: "Callback processed successfully",
    })
  } catch (error) {
    console.error("CBE Birr callback error:", error)
    return NextResponse.json(
      {
        response_code: "99",
        response_message: "Callback processing failed",
      },
      { status: 500 },
    )
  }
}

function verifyCBESignature(body: any, signature: string | null): boolean {
  // Implement proper signature verification for CBE Birr
  return signature !== null
}

function mapCBEStatus(cbeStatus: string): string {
  switch (cbeStatus) {
    case "00":
      return "SUCCESS"
    case "01":
      return "PENDING"
    case "02":
      return "PENDING"
    case "03":
      return "FAILED"
    case "04":
      return "EXPIRED"
    default:
      return "FAILED"
  }
}

async function updatePaymentStatus(transactionId: string, status: string, completedAt?: string) {
  // Update database record
  console.log("Updating CBE payment status:", { transactionId, status, completedAt })
}

async function sendPaymentConfirmationSMS(account: string, details: any) {
  // Send SMS confirmation
  console.log("Sending CBE SMS confirmation to:", account, details)
}
