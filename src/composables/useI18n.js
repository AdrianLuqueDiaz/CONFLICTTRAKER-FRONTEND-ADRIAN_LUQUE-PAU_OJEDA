import { ref } from 'vue'

export const locale = ref('ca') // Idioma por defecto: catalán

const translations = {
  ca: {
    title: "🌍 Monitor de Conflictes Global",
    searchPlaceholder: "Cerca conflictes per nom o país...",
    loading: "Carregant...",
    errorConn: "Error de connexió amb la API.",
    noResults: "No s'han trobat conflictes amb aquesta cerca.",
    start: "Inici",
    status: "Estat",
    viewDetail: "Veure Detall",
    back: "← Tornar a la llista",
    generalInfo: "📄 Informació General",
    countriesInvolved: "🏳️ Països Implicats",
    noCountries: "No hi ha dades de països registrades.",
    unknown: "Desconeguda",
    langSwitch: "English"
  },
  en: {
    title: "🌍 Global Conflict Monitor",
    searchPlaceholder: "Search conflicts by name or country...",
    loading: "Loading...",
    errorConn: "API connection error.",
    noResults: "No conflicts found for this search.",
    start: "Start",
    status: "Status",
    viewDetail: "View Details",
    back: "← Back to list",
    generalInfo: "📄 General Information",
    countriesInvolved: "🏳️ Countries Involved",
    noCountries: "No country data registered for this conflict.",
    unknown: "Unknown",
    langSwitch: "Català"
  }
}

export const t = (key) => {
  return translations[locale.value][key] || key
}

export const toggleLanguage = () => {
  locale.value = locale.value === 'ca' ? 'en' : 'ca'
}