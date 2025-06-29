"use server"

import { ethiopiaPostAPI, type DeliveryRequest, type DeliveryAddress } from "@/lib/ethiopia-post-api"

export interface PostOfficeDeliveryResult {
  success: boolean
  trackingNumber?: string
  estimatedDeliveryDate?: string
  deliveryFee?: number
  message: string
  error?: string
}

export interface TrackingResult {
  success: boolean
  trackingInfo?: any
  message: string
  error?: string
}

// Schedule document delivery through Ethiopia Post
export async function scheduleDocumentDelivery(
  documentType: "registration" | "inspection" | "license_plate" | "renewal",
  documentId: string,
  vehiclePlateNumber: string,
  ownerName: string,
  deliveryAddress: DeliveryAddress,
  serviceType: "standard" | "express" = "standard",
): Promise<PostOfficeDeliveryResult> {
  try {
    // Validate required fields
    if (!documentId || !vehiclePlateNumber || !ownerName) {
      return {
        success: false,
        message: "Missing required document information",
        error: "MISSING_REQUIRED_FIELDS",
      }
    }

    if (!deliveryAddress.recipientName || !deliveryAddress.phoneNumber || !deliveryAddress.region) {
      return {
        success: false,
        message: "Missing required delivery address information",
        error: "MISSING_ADDRESS_FIELDS",
      }
    }

    // Prepare delivery request
    const deliveryRequest: DeliveryRequest = {
      documentType,
      documentId,
      vehiclePlateNumber,
      ownerName,
      deliveryAddress,
      serviceType,
      paymentMethod: "prepaid", // Government documents are prepaid
      specialInstructions: `Vehicle registration document for ${vehiclePlateNumber}. Please handle with care.`,
    }

    // Schedule delivery with Ethiopia Post
    const response = await ethiopiaPostAPI.scheduleDelivery(deliveryRequest)

    if (response.success) {
      // Log successful delivery scheduling
      console.log(`Document delivery scheduled: ${response.trackingNumber}`)

      return {
        success: true,
        trackingNumber: response.trackingNumber,
        estimatedDeliveryDate: response.estimatedDeliveryDate,
        deliveryFee: response.deliveryFee,
        message: `Document delivery scheduled successfully. Tracking number: ${response.trackingNumber}`,
      }
    } else {
      return {
        success: false,
        message: response.message || "Failed to schedule delivery",
        error: response.error || "DELIVERY_SCHEDULING_FAILED",
      }
    }
  } catch (error) {
    console.error("Error scheduling document delivery:", error)
    return {
      success: false,
      message: "An error occurred while scheduling delivery",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}

// Track document delivery status
export async function trackDocumentDelivery(trackingNumber: string): Promise<TrackingResult> {
  try {
    if (!trackingNumber) {
      return {
        success: false,
        message: "Tracking number is required",
        error: "MISSING_TRACKING_NUMBER",
      }
    }

    const trackingInfo = await ethiopiaPostAPI.trackDelivery(trackingNumber)

    if (trackingInfo) {
      return {
        success: true,
        trackingInfo,
        message: "Tracking information retrieved successfully",
      }
    } else {
      return {
        success: false,
        message: "Tracking information not found",
        error: "TRACKING_NOT_FOUND",
      }
    }
  } catch (error) {
    console.error("Error tracking document delivery:", error)
    return {
      success: false,
      message: "An error occurred while tracking delivery",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}

// Calculate delivery fee
export async function calculateDeliveryFee(
  fromRegion: string,
  toAddress: DeliveryAddress,
  serviceType: "standard" | "express" = "standard",
) {
  try {
    const feeCalculation = await ethiopiaPostAPI.calculateDeliveryFee(fromRegion, toAddress, serviceType)

    return {
      success: true,
      feeCalculation,
      message: "Delivery fee calculated successfully",
    }
  } catch (error) {
    console.error("Error calculating delivery fee:", error)
    return {
      success: false,
      message: "Failed to calculate delivery fee",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}

// Get nearby post offices
export async function getNearbyPostOffices(region: string, zone?: string) {
  try {
    const postOffices = await ethiopiaPostAPI.getNearbyPostOffices(region, zone, 20)

    return {
      success: true,
      postOffices,
      message: "Post offices retrieved successfully",
    }
  } catch (error) {
    console.error("Error getting post offices:", error)
    return {
      success: false,
      postOffices: [],
      message: "Failed to retrieve post offices",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}

// Schedule bulk delivery for multiple documents
export async function scheduleBulkDocumentDelivery(deliveryRequests: DeliveryRequest[]) {
  try {
    if (!deliveryRequests || deliveryRequests.length === 0) {
      return {
        success: false,
        message: "No delivery requests provided",
        error: "EMPTY_REQUEST_LIST",
      }
    }

    const responses = await ethiopiaPostAPI.scheduleBulkDelivery(deliveryRequests)

    const successCount = responses.filter((r) => r.success).length
    const failureCount = responses.length - successCount

    return {
      success: successCount > 0,
      responses,
      summary: {
        total: responses.length,
        successful: successCount,
        failed: failureCount,
      },
      message: `Bulk delivery scheduled: ${successCount} successful, ${failureCount} failed`,
    }
  } catch (error) {
    console.error("Error scheduling bulk delivery:", error)
    return {
      success: false,
      message: "Failed to schedule bulk delivery",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}

// Get delivery statistics for admin dashboard
export async function getDeliveryStatistics(startDate: string, endDate: string, region?: string) {
  try {
    const statistics = await ethiopiaPostAPI.getDeliveryStatistics(startDate, endDate, region)

    if (statistics) {
      return {
        success: true,
        statistics,
        message: "Delivery statistics retrieved successfully",
      }
    } else {
      return {
        success: false,
        message: "Failed to retrieve delivery statistics",
        error: "STATISTICS_NOT_AVAILABLE",
      }
    }
  } catch (error) {
    console.error("Error getting delivery statistics:", error)
    return {
      success: false,
      message: "An error occurred while retrieving statistics",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}

// Update delivery status (for Ethiopia Post staff)
export async function updateDeliveryStatus(trackingNumber: string, status: string, location: string, notes?: string) {
  try {
    const success = await ethiopiaPostAPI.updateDeliveryStatus(trackingNumber, status, location, notes)

    if (success) {
      return {
        success: true,
        message: "Delivery status updated successfully",
      }
    } else {
      return {
        success: false,
        message: "Failed to update delivery status",
        error: "STATUS_UPDATE_FAILED",
      }
    }
  } catch (error) {
    console.error("Error updating delivery status:", error)
    return {
      success: false,
      message: "An error occurred while updating status",
      error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
    }
  }
}
