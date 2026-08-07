import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['app/**/*.{ts,tsx}'],
    ignores: ['.next/*', 'out/*', 'public/*', 'node_modules/*'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      }
    }
  }
);
