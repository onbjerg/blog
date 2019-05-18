const Metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const markdown = require('metalsmith-markdown')
const assets = require('metalsmith-assets')
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const readingTime = require('metalsmith-word-count')

Metalsmith(__dirname)
  .metadata({
    title: 'notbjerg',
    description: 'Braindump',
    generator: 'Metalsmith',
    url: 'http://www.notbjerg.me/'
  })
  .source('./content')
  .destination('./build')
  .use(collections({
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .clean(false)
  .use(markdown({
    highlight: function(code) {
      return require('highlight.js').highlightAuto(code).value
    }
  }))
  .use(readingTime())
  .use(permalinks())
  .use(assets({
    source: './assets',
    destination: './assets'
  }))
  .use(layouts({
  	default: 'post.hbs',
    engineOptions: {
      helpers: {
        formatDate (date) {
          return new Date(date).toLocaleDateString('en-GB', {
            timeZone: 'UTC',
            year: 'numeric', month: 'long', day: 'numeric'
          })
        }
      }
    }
  }))
  .build((err, files) => {
    if (err) { throw err }
  })
