const {HI,EN} = require("../utils/constants/Locales")
const path = require("path");
const { I18n } = require("i18n");

const i18n = new I18n({
  locales: [HI,EN],
  directory: path.join(__dirname, "../translations"),
  defaultLocale: EN,
  objectNotation: true
});

module.exports ={i18n}