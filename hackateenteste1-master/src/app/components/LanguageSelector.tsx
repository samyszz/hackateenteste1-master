"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const availableLanguages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "简体中文" },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(
    availableLanguages.find((l) => l.code === i18n.language) || availableLanguages[3]
  );

  useEffect(() => {
    if (selectedLanguage && i18n.language !== selectedLanguage.code) {
      i18n.changeLanguage(selectedLanguage.code);
    }
  }, [selectedLanguage, i18n]);

  return (
    <div className="w-full max-w-[150px]">
      <select
        value={selectedLanguage.code}
        onChange={(e) => {
          const lang = availableLanguages.find((l) => l.code === e.target.value);
          if (lang) setSelectedLanguage(lang);
        }}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black dark:bg-zinc-950 dark:text-white"
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
