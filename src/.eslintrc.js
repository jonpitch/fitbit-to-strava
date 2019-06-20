module.exports = {
  env: {
    browser: true,
    es6: true
  },
  globals: {
    process: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'prettier/prettier': ['error'],
    'no-debugger': 'error',
    'no-shadow': 'error',
    'no-unused-vars': 'error'
  },
  overrides: [],
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
      flowVersion: '0.53'
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' }
    ],
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }]
  }
};
