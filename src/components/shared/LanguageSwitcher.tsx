import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="language-switcher fixed top-4 right-20 z-50 p-2 bg-white/10 backdrop-blur-md border border-white/20 text-black rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t("select_language")}
    >
      <option value="he">{t("language_he")}</option>
      <option value="en">{t("language_en")}</option>
    </motion.select>
  );
}
