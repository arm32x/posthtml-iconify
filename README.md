# posthtml-iconify <img align="right" height="100" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![Actions Status][action]][action-url]
[![NPM][npm]][npm-url]
[![Coverage][cover]][cover-badge]

Render icons from [Iconify](https://iconify.design) into SVG with PostHTML.

Before:
```html
<span class="iconify" data-icon="mdi:home"></span>
```

After:
```html
<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    aria-hidden="true" 
    focusable="false"
    width="1em" 
    height="1em" 
    style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" 
    preserveAspectRatio="xMidYMid meet" 
    viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5z" fill="#626262"/>
</svg>
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

[action]: https://github.com/arm32x/posthtml-iconify/workflows/Actions%20Status/badge.svg
[action-url]: https://github.com/arm32x/posthtml-iconify/actions?query=workflow%3A%22CI+tests%22

[npm]: https://img.shields.io/npm/v/posthtml-iconify.svg
[npm-url]: https://npmjs.com/package/posthtml-iconify

[style]: https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[style-url]: https://github.com/xojs/xo

[cover]: https://coveralls.io/repos/arm32x/posthtml-iconify/badge.svg?branch=master
[cover-badge]: https://coveralls.io/r/arm32x/posthtml-iconify?branch=master
