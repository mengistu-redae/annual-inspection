// Ethiopia Post API Integration
// Official API for document delivery services across Ethiopia

export interface EthiopiaPostConfig {
  baseUrl: string
  apiKey: string
  merchantId: string
  timeout: number
}

export interface DeliveryAddress {
  recipientName: string
  phoneNumber: string
  region: string
  zone: string
  woreda: string
  kebele: string
  houseNumber?: string
  specificLocation: string
  postalCode?: string
}

export interface DeliveryRequest {
  documentType: "registration" | "inspection" | "license_plate" | "renewal"
  documentId: string
  vehiclePlateNumber: string
  ownerName: string
  deliveryAddress: DeliveryAddress
  serviceType: "standard" | "express"
  paymentMethod: "prepaid" | "cash_on_delivery"
  specialInstructions?: string
}

export interface DeliveryResponse {
  success: boolean
  trackingNumber: string
  estimatedDeliveryDate: string
  deliveryFee: number
  message: string
  error?: string
}

export interface TrackingInfo {
  trackingNumber: string
  status: "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "failed"
  currentLocation: string
  estimatedDeliveryDate: string
  deliveryAttempts: number
  lastUpdated: string
  deliveryHistory: TrackingEvent[]
}

export interface TrackingEvent {
  timestamp: string
  location: string
  status: string
  description: string
}

export interface PostOffice {
  id: string
  name: string
  region: string
  zone: string
  woreda: string
  address: string
  phoneNumber: string
  email: string
  operatingHours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  services: string[]
  coordinates: {
    latitude: number
    longitude: number
  }
}

export interface DeliveryFeeCalculation {
  baseRate: number
  distanceFee: number
  serviceFee: number
  totalFee: number
  currency: "ETB"
  estimatedDeliveryDays: number
}

class EthiopiaPostAPI {
  private config: EthiopiaPostConfig

  constructor(config: EthiopiaPostConfig) {
    this.config = config
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`

    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.apiKey}`,
      "X-Merchant-ID": this.config.merchantId,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
        signal: AbortSignal.timeout(this.config.timeout),
      })

      if (!response.ok) {
        throw new Error(`Ethiopia Post API Error: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Ethiopia Post API Request Failed:", error)
      throw error
    }
  }

  // Schedule document delivery
  async scheduleDelivery(request: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      const response = await this.makeRequest("/api/v1/delivery/schedule", {
        method: "POST",
        body: JSON.stringify({
          ...request,
          merchantId: this.config.merchantId,
          timestamp: new Date().toISOString(),
        }),
      })

      return {
        success: response.success,
        trackingNumber: response.tracking_number,
        estimatedDeliveryDate: response.estimated_delivery_date,
        deliveryFee: response.delivery_fee,
        message: response.message,
      }
    } catch (error) {
      return {
        success: false,
        trackingNumber: "",
        estimatedDeliveryDate: "",
        deliveryFee: 0,
        message: "Failed to schedule delivery",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Track delivery status
  async trackDelivery(trackingNumber: string): Promise<TrackingInfo | null> {
    try {
      const response = await this.makeRequest(`/api/v1/delivery/track/${trackingNumber}`)

      return {
        trackingNumber: response.tracking_number,
        status: response.status,
        currentLocation: response.current_location,
        estimatedDeliveryDate: response.estimated_delivery_date,
        deliveryAttempts: response.delivery_attempts,
        lastUpdated: response.last_updated,
        deliveryHistory: response.delivery_history.map((event: any) => ({
          timestamp: event.timestamp,
          location: event.location,
          status: event.status,
          description: event.description,
        })),
      }
    } catch (error) {
      console.error("Failed to track delivery:", error)
      return null
    }
  }

  // Calculate delivery fee
  async calculateDeliveryFee(
    fromRegion: string,
    toAddress: DeliveryAddress,
    serviceType: "standard" | "express",
  ): Promise<DeliveryFeeCalculation> {
    try {
      const response = await this.makeRequest("/api/v1/delivery/calculate-fee", {
        method: "POST",
        body: JSON.stringify({
          from_region: fromRegion,
          to_address: toAddress,
          service_type: serviceType,
        }),
      })

      return {
        baseRate: response.base_rate,
        distanceFee: response.distance_fee,
        serviceFee: response.service_fee,
        totalFee: response.total_fee,
        currency: "ETB",
        estimatedDeliveryDays: response.estimated_delivery_days,
      }
    } catch (error) {
      console.error("Failed to calculate delivery fee:", error)
      // Return default rates
      return {
        baseRate: 50,
        distanceFee: serviceType === "express" ? 100 : 50,
        serviceFee: 25,
        totalFee: serviceType === "express" ? 175 : 125,
        currency: "ETB",
        estimatedDeliveryDays: serviceType === "express" ? 2 : 5,
      }
    }
  }

  // Get nearby post offices
  async getNearbyPostOffices(region: string, zone?: string, limit = 10): Promise<PostOffice[]> {
    try {
      const params = new URLSearchParams({
        region,
        limit: limit.toString(),
      })

      if (zone) {
        params.append("zone", zone)
      }

      const response = await this.makeRequest(`/api/v1/post-offices?${params}`)

      return response.post_offices.map((office: any) => ({
        id: office.id,
        name: office.name,
        region: office.region,
        zone: office.zone,
        woreda: office.woreda,
        address: office.address,
        phoneNumber: office.phone_number,
        email: office.email,
        operatingHours: office.operating_hours,
        services: office.services,
        coordinates: office.coordinates,
      }))
    } catch (error) {
      console.error("Failed to get post offices:", error)
      return []
    }
  }

  // Bulk delivery scheduling for government documents
  async scheduleBulkDelivery(requests: DeliveryRequest[]): Promise<DeliveryResponse[]> {
    try {
      const response = await this.makeRequest("/api/v1/delivery/bulk-schedule", {
        method: "POST",
        body: JSON.stringify({
          deliveries: requests,
          merchantId: this.config.merchantId,
          timestamp: new Date().toISOString(),
        }),
      })

      return response.results.map((result: any) => ({
        success: result.success,
        trackingNumber: result.tracking_number,
        estimatedDeliveryDate: result.estimated_delivery_date,
        deliveryFee: result.delivery_fee,
        message: result.message,
        error: result.error,
      }))
    } catch (error) {
      console.error("Failed to schedule bulk delivery:", error)
      return requests.map(() => ({
        success: false,
        trackingNumber: "",
        estimatedDeliveryDate: "",
        deliveryFee: 0,
        message: "Failed to schedule delivery",
        error: error instanceof Error ? error.message : "Unknown error",
      }))
    }
  }

  // Update delivery status (for Ethiopia Post internal use)
  async updateDeliveryStatus(
    trackingNumber: string,
    status: string,
    location: string,
    notes?: string,
  ): Promise<boolean> {
    try {
      await this.makeRequest(`/api/v1/delivery/update-status`, {
        method: "PUT",
        body: JSON.stringify({
          tracking_number: trackingNumber,
          status,
          location,
          notes,
          timestamp: new Date().toISOString(),
        }),
      })
      return true
    } catch (error) {
      console.error("Failed to update delivery status:", error)
      return false
    }
  }

  // Get delivery statistics
  async getDeliveryStatistics(startDate: string, endDate: string, region?: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      })

      if (region) {
        params.append("region", region)
      }

      const response = await this.makeRequest(`/api/v1/delivery/statistics?${params}`)
      return response
    } catch (error) {
      console.error("Failed to get delivery statistics:", error)
      return null
    }
  }
}

// Create Ethiopia Post API instance
export const createEthiopiaPostAPI = (config: EthiopiaPostConfig): EthiopiaPostAPI => {
  return new EthiopiaPostAPI(config)
}

// Default configuration for Ethiopia Post API
export const getDefaultEthiopiaPostConfig = (): EthiopiaPostConfig => ({
  baseUrl: process.env.ETHIOPIA_POST_BASE_URL || "https://api.ethiopiapost.gov.et",
  apiKey: process.env.ETHIOPIA_POST_API_KEY || "",
  merchantId: process.env.ETHIOPIA_POST_MERCHANT_ID || "",
  timeout: 30000, // 30 seconds
})

// Export the default instance
export const ethiopiaPostAPI = createEthiopiaPostAPI(getDefaultEthiopiaPostConfig())
