module.exports = {
  overrides: [],
};
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:astro/recommended", "prettier"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: [".astro"],
  },
  rules: {
    "@typescript-eslint/triple-slash-reference": "off",
  },
};
