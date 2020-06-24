module.exports = {
  root: true,
  env: {
    node: true
  },
  "plugins": ["prettier"],
  // extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  extends: ["prettier", "plugin:prettier/recommended", "plugin:vue/essential", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    //"prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  }
};
