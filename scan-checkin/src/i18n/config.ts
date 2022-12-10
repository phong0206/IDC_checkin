import i18n from "i18next";

import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["home"],
  resources: {},
  interpolation: {
    escapeValue: false,
  },
});

const context = require.context("./locale", true, /\.json$/);

if (context.keys().length) {
  context.keys().forEach((link: string, index: number) => {
    const linkArr = link.split("/");
    i18n.addResourceBundle(
      linkArr[1],
      linkArr[2].replace(".json", ""),
      context(context.keys()[index])
    );
  });
}

export default i18n;
