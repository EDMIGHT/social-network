module.exports = {
  env: { browser: true, es2020: true },
  ignorePatterns: ['vite.config.ts'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', project: './tsconfig.json' },
  plugins: ['react-refresh', 'prettier', 'simple-import-sort'],
  rules: {
    'react/jsx-pascal-case': [2, { allowNamespace: true }],
    'react-refresh/only-export-components': 'warn',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/button-has-type': 0,
    'react/no-unstable-nested-components': [
      2,
      {
        allowAsProps: true,
      },
    ],
    'react/no-array-index-key': 0,
    'no-param-reassign': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/order': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/export': 0,
  },
};
