# booster
> A [Knex.js](https://knexjs.org/) utility to make setting up a database super
> easy

[![Npm page][npm-image]][npm-url]
[![appjumpstart chat][gitter-image]][gitter-url]

# Installation

```console
npm install @appjumpstart/booster --save-dev
```

## Usage

If `NODE_ENV` isn't set, `booster` defaults to the development config in your
`knexfile.js`:

```console
❯ npx booster

  👟 Migrations run!

  🌱 Database seeded!
```

Set up a `test` database:

```console
❯ npx booster test

  🚀 Database booster_test created!

  👟 Migrations run!

  🌱 Database seeded!
```

&nbsp;

<a href="https://github.com/appjumpstart">
  <img
    alt="AppJumpstart"
    src="https://appjumpstart.nyc3.digitaloceanspaces.com/assets/appjumpstart-transparent.png"
    height="50">
</a>

[npm-image]: https://img.shields.io/npm/v/@appjumpstart/booster.svg
[npm-url]: https://www.npmjs.com/package/@appjumpstart/booster
[gitter-image]: https://img.shields.io/gitter/room/appjumpstart/appjumpstart.svg
[gitter-url]: https://gitter.im/appjumpstart
