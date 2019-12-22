module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true
  },

  extends: "airbnb-base",

  rules: {
    camelcase: "off",
    "comma-dangle": 0,
    "arrow-parens": 0,
    quotes: ["error", "double"],
    indent: ["error", 2]
  }
};
