module.exports = {
  extends: ['react-app', 'react-app/jest'],
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  ignorePatterns: [
    'build/**/*',
    'dist/**/*',
    'node_modules/**/*',
    '*.min.js'
  ],
  rules: {
    // Add any custom rules here
  }
};
