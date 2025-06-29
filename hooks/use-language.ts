"use client"

import { useState, useCallback } from "react"

type Language = "en" | "am"

interface Translations {
  [key: string]: {
    en: string
    am: string
  }
}

const translations: Translations = {
  // Dashboard
  "dashboard.title": {
    en: "ቦሎ Digital Dashboard",
    am: "ቦሎ ዲጂታል ዳሽቦርድ",
  },
  "dashboard.subtitle": {
    en: "Vehicle Inspection & Registration System",
    am: "የተሽከርካሪ ምርመራ እና ምዝገባ ስርዓት",
  },

  // Navigation
  "nav.citizens": {
    en: "Vehicle Owners",
    am: "የተሽከርካሪ ባለቤቶች",
  },
  "nav.centers": {
    en: "Inspection Centers",
    am: "የምርመራ ማዕከላት",
  },
  "nav.authority": {
    en: "Transport Authority",
    am: "የትራንስፖርት ባለስልጣን",
  },
  "nav.insurance": {
    en: "Insurance Companies",
    am: "የኢንሹራንስ ኩባንያዎች",
  },

  // Actions
  "action.book_inspection": {
    en: "Book Inspection",
    am: "ምርመራ ይያዙ",
  },
  "action.pay_fees": {
    en: "Pay Fees",
    am: "ክፍያ ይፈጽሙ",
  },
  "action.view_documents": {
    en: "View Documents",
    am: "ሰነዶችን ይመልከቱ",
  },
  "action.admin_dashboard": {
    en: "Admin Dashboard",
    am: "የአስተዳዳሪ ዳሽቦርድ",
  },

  // Status
  "status.active": {
    en: "Active",
    am: "ንቁ",
  },
  "status.expired": {
    en: "Expired",
    am: "ጊዜው ያለፈ",
  },
  "status.pending": {
    en: "Pending",
    am: "በመጠባበቅ ላይ",
  },

  // Common
  "common.language": {
    en: "Language",
    am: "ቋንቋ",
  },
  "common.english": {
    en: "English",
    am: "እንግሊዝኛ",
  },
  "common.amharic": {
    en: "Amharic",
    am: "አማርኛ",
  },
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en")

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[language] || key
    },
    [language],
  )

  const changeLanguage = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage)
  }, [])

  return {
    language,
    setLanguage: changeLanguage,
    t,
  }
}
