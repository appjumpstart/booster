# booster
> A [Knex.js][knexUrl] utility to make setting up a database super easy

[![npm page][npmImage]][npmUrl]

# Installation

```console
yarn add @ianwalter/booster --dev
```

## Usage

If `NODE_ENV` isn't set, `booster` defaults to the development config in your
`knexfile.js`:

```console
❯ yarn booster

  👟 Migrations run!

  🌱 Database seeded!
```

Set up a `test` database:

```console
❯ yarn booster test

  🚀 Database booster_test created!

  👟 Migrations run!

  🌱 Database seeded!
```

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

[knexUrl]: https://knexjs.org
[npmImage]: https://img.shields.io/npm/v/@ianwalter/booster.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/booster
[licenseUrl]: https://github.com/ianwalter/booster/blob/master/LICENSE
