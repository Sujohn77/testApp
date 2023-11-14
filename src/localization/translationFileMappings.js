export const translationFileMappings = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require("./translations/en"),
  it: () => require("./translations/it"),
  pt: () => require("./translations/pt"),
  es: () => require("./translations/es.json"),
  de: () => require("./translations/es.json"),
  sv: () => require("./translations/sv.json"),
};
