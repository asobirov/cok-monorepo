
/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier"
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  ignorePatterns: ["/node_modules", "/build", "/public/build"],
};
