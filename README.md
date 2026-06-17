# tronz Docs

Documentation for [tronz](https://github.com/throgxyz/tronz), an idiomatic,
async-first Rust SDK for the TRON network — inspired by
[alloy](https://github.com/alloy-rs/alloy).

The site is built with [vocs](https://vocs.dev).

## Development

Clone with submodules (the [examples](https://github.com/throgxyz/examples)
repo is vendored at `lib/examples`):

```sh
git clone --recurse-submodules https://github.com/throgxyz/docs.git
# or, in an existing clone:
git submodule update --init
```

Then run the dev server:

```sh
cd vocs
npm install
npm run dev    # open the printed local URL
```

> Note: vocs 2 / waku currently require an LTS Node (20 or 22). Newer versions
> (e.g. Node 25) fail during static generation with a `react-server` error.

## Examples

Example pages are generated from the `lib/examples` submodule. To refresh them
after the examples repo changes:

```sh
./scripts/update.sh
```

This syncs the submodule to `main`, copies each example's source into
`vocs/docs/snippets/<category>/examples/`, generates one page per example plus a
category landing page under `vocs/docs/pages/examples/`, and regenerates the
sidebar items in `vocs/example-items.ts`.

Edit the per-category descriptions and ordering in
`vocs/docs/pages/templates/<category>/README.mdx` — the generated pages and
sidebar are derived from these. Do not edit generated files directly.

## Structure

- `vocs/vocs.config.ts` — site config (title, nav, socials).
- `vocs/sidebar.ts` — sidebar layout (imports generated `example-items.ts`).
- `vocs/example-items.ts` — generated Examples sidebar (do not edit).
- `vocs/docs/pages/` — documentation pages (`.md` / `.mdx`).
- `vocs/docs/pages/templates/` — hand-written per-category example templates.
- `vocs/docs/pages/examples/` — generated example pages (do not edit).
- `vocs/docs/snippets/` — example sources, embedded via `// [!include ~/snippets/...]`.
- `scripts/update.sh` — regenerates the snippets, example pages, and sidebar.
- `lib/examples` — `throgxyz/examples` git submodule (source of the examples).

## License

Licensed under either of [Apache License, Version 2.0](../tronz/LICENSE-APACHE)
or [MIT license](../tronz/LICENSE-MIT) at your option.
