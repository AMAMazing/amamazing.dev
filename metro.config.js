const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Support extra asset extensions
config.resolver.assetExts.push('md', 'mdx');

module.exports = config;