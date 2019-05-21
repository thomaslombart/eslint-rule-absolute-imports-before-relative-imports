# ESLint rule: absolute imports before relative imports

This rule makes sure that you always write absolute imports before relative imports.

For example, this code is valid: 

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
```

While this one is not valid:

```js
import React from 'react'
import App from './components/App'
import ReactDOM from 'react-dom'
```
