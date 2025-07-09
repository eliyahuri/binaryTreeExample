import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <motion.div className="fixed top-4 right-20 z-50">
      <motion.select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="
          px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700
          bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          text-gray-900 dark:text-gray-100
          focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
          hover:border-blue-400 hover:shadow-md
          transition-all duration-200 ease-in-out
          shadow-sm focus:shadow-lg
          cursor-pointer appearance-none
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')]
          dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iI0Y5RkFGQiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+')]
          bg-no-repeat bg-right bg-[length:16px_16px] pr-10
          font-medium min-w-[100px]
        "
        whileHover={{ scale: 1.02 }}
        whileFocus={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        aria-label={t("select_language")}
        role="combobox"
        aria-expanded="false"
      >
        <option
          value="he"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2"
        >
          {t("language_he")}
        </option>
        <option
          value="en"
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2"
        >
          {t("language_en")}
        </option>
      </motion.select>
    </motion.div>
  );
}
