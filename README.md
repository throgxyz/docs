# tronz Docs

[![Docs](https://img.shields.io/badge/docs-online-4c1)](https://throgxyz.github.io/docs/)
[![CI](https://github.com/throgxyz/docs/actions/workflows/book.yml/badge.svg)](https://github.com/throgxyz/docs/actions/workflows/book.yml)
[![tronz 0.3.x](https://img.shields.io/badge/tronz-0.3.x-4c1)](https://github.com/throgxyz/tronz/releases/tag/v0.3.0)
[![license](https://img.shields.io/badge/license-MIT%20OR%20Apache--2.0-blue)](https://github.com/throgxyz/tronz#license)

Documentation for [tronz](https://github.com/throgxyz/tronz), an idiomatic,
async-first Rust SDK for the TRON network, inspired by
[alloy](https://github.com/alloy-rs/alloy).

View the documentation at
**[throgxyz.github.io/docs](https://throgxyz.github.io/docs/)**.

The site is built with [Vocs](https://vocs.dev).

## Development

Clone the repository with its
[examples](https://github.com/throgxyz/examples) submodule:

```sh
git clone --recurse-submodules https://github.com/throgxyz/docs.git
cd docs
```

For an existing clone:

```sh
git submodule update --init
```

Install dependencies and start the development server:

```sh
cd vocs
npm install
npm run dev
```

Vocs 2 and Waku currently require an LTS version of Node.js, preferably Node
20 or 22. Newer unsupported versions may fail during static generation.

## Documentation

Hand-written documentation lives in:

```text
vocs/docs/pages/
```

The main site configuration and navigation are defined in:

```text
vocs/vocs.config.ts
vocs/sidebar.ts
```

To suggest a documentation change, edit the relevant hand-written page and
open a pull request.

## Examples

Runnable examples come from the
[throgxyz/examples](https://github.com/throgxyz/examples) repository, included
as the `lib/examples` git submodule.

Refresh generated example pages with:

```sh
./scripts/update.sh
```

The update script:

1. Syncs the examples submodule.
2. Copies example sources into `vocs/docs/snippets/`.
3. Generates pages under `vocs/docs/pages/examples/`.
4. Regenerates `vocs/example-items.ts`.

Edit category descriptions and ordering in:

```text
vocs/docs/pages/templates/<category>/README.mdx
```

Do not edit these generated files directly:

```text
vocs/docs/pages/examples/
vocs/docs/snippets/
vocs/example-items.ts
```

## Contributing

Contributions are welcome. Please open an issue or pull request in this
repository for documentation changes.

For SDK changes, use the
[tronz repository](https://github.com/throgxyz/tronz).

## License

Licensed under either the
[Apache License, Version 2.0](https://github.com/throgxyz/tronz/blob/main/LICENSE-APACHE)
or the [MIT License](https://github.com/throgxyz/tronz/blob/main/LICENSE-MIT),
at your option.
