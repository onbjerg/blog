---
layout: post
title: Internationalization in React Using Higher-Order Components
---

A simple way to make your React SPA international is to use a higher-order component that wraps your other components.

This is what I came up with:

```js
import React from 'React'
import en from '../lang/en'
import da from '../lang/da'
​
/**
 * Could be refactored in to JSON files that are lazily loaded. It could
 * also use a 3rd party localization service. Maybe.
 *
 * Example translation (for MyComponent for the ``en`` key in ``languages``)
 *
 *	  {
 *      'en': {
 *        'MyComponent': { 'hello': 'Hello, world' }
 *      }
 *    }
 *
 */
const languages = {
  en,
  da
}
​
/**
 * A higher order component that makes our components international. 😎
 *
 * Example usage (MyComponent.js):
 *
 * 	  const MyComponent = ({ strings }) => <div>{strings.hello}</div>
 *	  export default translate('MyComponent')(MyComponent)
 *
 */
export default function translate (key) {
  return Component => {
    class TranslationComponent extends React.Component {
      render () {
        var strings = languages[this.context.currentLanguage][key]
        return <Component {...this.props} {...this.state} strings={strings} />
      }
    }
​
    TranslationComponent.contextTypes = {
      currentLanguage: React.PropTypes.string
    }
​
    return TranslationComponent
  }
}
```

It's pretty simple, but thus far it has worked pretty good in my projects.
