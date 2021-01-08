# posthtml-iconify <img align="right" height="100" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![NPM][npm]][npm-url]

Render icons from [Iconify](https://iconify.design) into SVG with PostHTML.

Before:
```html
<span class="iconify" data-icon="mdi:home"></span>
```

After:
```html
<svg data-icon="mdi:home" ...>...</svg>
```

## Install

Install using NPM or Yarn.

```bash
npm install posthtml-iconify
yarn add posthtml-iconify
```

## Usage

Use like a normal PostHTML plugin.

```js
const fs = require('fs');
const posthtml = require('posthtml');
const posthtmlIconify = require('posthtml-iconify');

posthtml()
    .use(posthtmlIconify())
    .process(html/*, options */)
    .then(result => fs.writeFileSync('./after.html', result.html));
```

## Options

No options currently (this may change in the future).

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs).

[npm]: https://img.shields.io/npm/v/posthtml-iconify.svg
[npm-url]: https://npmjs.com/package/posthtml-iconify
