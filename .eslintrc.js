module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
      'semi': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'off',
      'comma-dangle': 'off',
      'import/no-extraneous-dependencies': 'off',
      'quotes': 'off'
    }
};
