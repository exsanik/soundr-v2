module.exports = {
    env: {
      browser: true,
      es6: true
    },
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended'
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true // Allows for the parsing of JSX
      }
    },
    settings: {
      react: {
        version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
      }
    },
    rules: {
      'prettier/prettier': ['error'],
      camelcase: 'off',
  
      // Typescript
      '@typescript-eslint/semi': 0,
      '@typescript-eslint/lines-between-class-members': 0,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
  
      // React
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
    }
  }
  