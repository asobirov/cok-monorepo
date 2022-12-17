/** @type {import("nextra").NextraConfig} */
const config = {
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
}

module.exports = require('nextra')(config);