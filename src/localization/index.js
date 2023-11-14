import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import {NativeModules} from "react-native";

import en from "./translations/en.json";
import de from "./translations/de.json";
import pt from "./translations/pt.json";
import es from "./translations/es.json";
import sv from "./translations/sv.json";
import it from "./translations/it.json";

const resources = {
  en: {translation: en},
  de: {translation: de},
  it: {translation: it},
  pt: {translation: pt},
  sv: {translation: sv},
  es: {translation: es},
};

const locale =
  NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0];

i18next.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: locale.slice(2),
  fallbackLng: "en",
  resources,
});
export default i18next;
