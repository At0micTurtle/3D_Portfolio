import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import enTranslation from "../locales/en.json";
import frTranslation from "../locales/fr.json";

export default i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslation,
		},
		fr: {
			translation: frTranslation,
		},
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});
