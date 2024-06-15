import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  // custom flat configs
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': 'off', // allow console.log in TypeScript files
    },
  }
  // {
  //   ...
  // }
);
