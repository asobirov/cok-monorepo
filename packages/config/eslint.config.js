
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
    "react/no-children-prop": "off",
  },
  ignorePatterns: ["/node_modules", "/build", "/public/build"],
};
