module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis'],
  plugins: ['eslint-plugin-import-helpers'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'import-helpers/order-imports': [
          'warn',
          {
            newlinesBetween: 'always',
            groups: [
              '/^react/',
              '/^expo/',
              '/styled-components/',
              'module',
              '/^@src/',
              '/^@components/',
              '/^@screens/',
              '/^@assets/',
              ['parent', 'sibling', 'index'],
            ],
            alphabetize: { order: 'asc', ignoreCase: true },
          },
        ],
        'import/order': 'off',
        'no-undef': 'off',
        'import/namespace': 'off',
      },
    },
  ],
};
