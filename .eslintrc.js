module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        curly: 'off',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
