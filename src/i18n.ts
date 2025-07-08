import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common_en from "./locales/en/common.json";
import common_he from "./locales/he/common.json";

// Initialize i18n
i18n.use(initReactI18next).init({
  resources: {
    en: { common: common_en },
    he: { common: common_he },
  },
  lng: "he", // default language
  fallbackLng: "he",
  ns: ["common"],
  defaultNS: "common",
  interpolation: { escapeValue: false },
});

export default i18n;
