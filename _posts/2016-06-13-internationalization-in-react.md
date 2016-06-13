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
 */
const languages = {
  en,
  da
}
​
/**
 * A higher order component that makes our components international. 😎
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

This is an example of a file with localized strings:

```json
{
  "MyComponent": { "hello": "Hello, world!" }
}
```

And this is an example usage:

```js
import translate from './translate'

const MyComponent = ({ strings }) =>
  (<div>{strings.hello}</div>)

export default translate('MyComponent')(MyComponent)
```

# Switching languages

Switching languages can be done using child contexts. The language picker should be in the top-level component (usually ``App``).

```js
import { default as React, PropTypes } from 'react'
import Menu from '../components/Menu'
import { connect } from 'react-redux'
import { changeLanguage } from '../state/lang'

class App extends React.Component {
  render () {
    return (
      <div>
        <Menu onLanguageChange={this.props.changeLanguage} />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }

  getChildContext () {
    return {
      currentLanguage: this.props.currentLanguage
    }
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

App.childContextTypes = {
  currentLanguage: PropTypes.string.isRequired
}

function select (state) {
  return { user: state.auth.user, currentLanguage: state.lang.current }
}
```
