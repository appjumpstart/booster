# booster
> A [Knex.js][knexUrl] utility to make setting up a database super easy

[![npm page][npmImage]][npmUrl]

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

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

<a href="https://github.com/appjumpstart">
  <img
    alt="AppJumpstart"
    src="https://appjumpstart.nyc3.digitaloceanspaces.com/assets/appjumpstart-transparent.png"
    height="50">
</a>

[knexUrl]: https://knexjs.org
[npmImage]: https://img.shields.io/npm/v/@appjumpstart/booster.svg
[npmUrl]: https://www.npmjs.com/package/@appjumpstart/booster
[licenseUrl]: https://github.com/appjumpstart/booster/blob/master/LICENSE
