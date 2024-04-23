module.exports = {
  extends: ['universe', 'universe/shared/typescript-analysis'],
  rules: {
    'object-shorthand': ['error', 'always']
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: true
      }
    }
  ]
};
