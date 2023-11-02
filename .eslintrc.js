module.exports = {
  root: true,
  extends: '@react-native',
  'react/no-unstable-nested-components': [
    'off' | 'warn' | 'error',
    {
      allowAsProps: true,
      customValidators:
        [] /* optional array of validators used for propTypes validation */,
    },
  ],
};
