export const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    bookAppointment: "Book Appointment",
    payments: "Payments",
    documents: "Documents",
    analytics: "Analytics",

    // Common
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    continue: "Continue",
    back: "Back",
    next: "Next",
    submit: "Submit",

    // Dashboard
    welcomeMessage: "Welcome to ቦሎ Digital",
    vehicleRegistration: "Vehicle Registration System",
    totalVehicles: "Total Vehicles",
    pendingRenewals: "Pending Renewals",
    completedThisYear: "Completed This Year",
    nextInspection: "Next Inspection",

    // Appointments
    bookInspection: "Book Vehicle Inspection",
    selectCenter: "Select Inspection Center",
    chooseTime: "Choose Date & Time",
    confirmBooking: "Confirm Booking",

    // Payments
    paymentCenter: "Payment Center",
    pendingPayments: "Pending Payments",
    paymentHistory: "Payment History",
    makePayment: "Make Payment",

    // Notifications
    appointmentConfirmed: "Your appointment has been confirmed",
    paymentSuccessful: "Payment completed successfully",
    documentReady: "Your document is ready for download",
  },
  am: {
    // Navigation
    dashboard: "ዳሽቦርድ",
    bookAppointment: "ቀጠሮ ይያዙ",
    payments: "ክፍያዎች",
    documents: "ሰነዶች",
    analytics: "ትንታኔ",

    // Common
    loading: "በመጫን ላይ...",
    save: "አስቀምጥ",
    cancel: "ሰርዝ",
    continue: "ቀጥል",
    back: "ተመለስ",
    next: "ቀጣይ",
    submit: "አስገባ",

    // Dashboard
    welcomeMessage: "ወደ ቦሎ ዲጂታል እንኳን በደህና መጡ",
    vehicleRegistration: "የተሽከርካሪ ምዝገባ ስርዓት",
    totalVehicles: "ጠቅላላ ተሽከርካሪዎች",
    pendingRenewals: "በመጠባበቅ ላይ ያሉ ታዳሾች",
    completedThisYear: "በዚህ ዓመት የተጠናቀቁ",
    nextInspection: "ቀጣይ ምርመራ",

    // Appointments
    bookInspection: "የተሽከርካሪ ምርመራ ቀጠሮ ይያዙ",
    selectCenter: "የምርመራ ማዕከል ይምረጡ",
    chooseTime: "ቀን እና ሰዓት ይምረጡ",
    confirmBooking: "ቀጠሮ አረጋግጡ",

    // Payments
    paymentCenter: "የክፍያ ማዕከል",
    pendingPayments: "በመጠባበቅ ላይ ያሉ ክፍያዎች",
    paymentHistory: "የክፍያ ታሪክ",
    makePayment: "ክፍያ ያድርጉ",

    // Notifications
    appointmentConfirmed: "ቀጠሮዎ ተረጋግጧል",
    paymentSuccessful: "ክፍያ በተሳካ ሁኔታ ተጠናቅቋል",
    documentReady: "ሰነድዎ ለማውረድ ዝግጁ ነው",
  },
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

export function getTranslation(key: TranslationKey, lang: Language): string {
  return translations[lang][key] || translations.en[key]
}
