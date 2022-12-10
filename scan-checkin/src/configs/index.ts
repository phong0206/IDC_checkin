const LIST_LANGUAGE = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "cn",
    label: "中文简体",
  },
  {
    value: "dt",
    label: "Nederlands",
  },
  {
    value: "id",
    label: "Bahasa Indonesia",
  },
  {
    value: "jp",
    label: "日本語",
  },
  {
    value: "prs",
    label: "فارسی",
  },
  {
    value: "rn",
    label: "русский",
  },
  {
    value: "vi",
    label: "Tiếng Việt",
  },
  {
    value: "srb",
    label: "Српски",
  },
  {
    value: "arb",
    label: "عربي",
  },
  {
    value: "sp",
    label: "Español",
  },
  {
    value: "fr",
    label: "français",
  },
  {
    value: "hi",
    label: "हिंदी",
  },
  {
    value: "por",
    label: "Portuguese",
  },
];

const Joi = require("@hapi/joi");

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    REACT_APP_API: Joi.string().default("http://localhost:5000"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const Config = {
  env: envVars.NODE_ENV,
  API_URL: envVars.REACT_APP_API,
  LIST_LANGUAGE,
};
