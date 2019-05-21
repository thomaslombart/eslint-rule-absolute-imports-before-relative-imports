const { RuleTester } = require("eslint");
const rule = require("./");

const parserOptions = {
  ecmaVersion: 6,
  sourceType: "module"
};

const ruleTester = new RuleTester({ parserOptions });
ruleTester.run("absolute-import-on-top-of-relative-imports", rule, {
  valid: [
    `
      import ReactDOM from 'react-dom'
      import Component from '../Component'
    `,
    `
      import _ from 'lodash'
      import 'foo/bar'
      import '../relativePackage'
    `,
    `
      import Button from '../Button'
    `
  ],
  invalid: [
    invalid(
      `
        import React from 'react'
        import App from './components/App'
        import ReactDOM from 'react-dom'
      `
    )
  ]
});

function invalid(code, output) {
  const invalidTest = {
    code,
    errors: [
      { message: "Absolute imports should be put before relative imports" }
    ]
  };

  if (output) {
    invalidTest.output = output;
  }

  return invalidTest;
}
