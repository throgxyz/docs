# tronz Docs

Documentation for [tronz](https://github.com/deszhou/tronz), an idiomatic,
async-first Rust SDK for the TRON network — inspired by
[alloy](https://github.com/alloy-rs/alloy).

The site is built with [vocs](https://vocs.dev).

## Development

```sh
cd vocs
bun install   # or: npm install
bun run dev    # or: npm run dev
```

Then open the printed local URL.

## Structure

- `vocs/vocs.config.ts` — site config (title, nav, socials).
- `vocs/sidebar.ts` — sidebar layout.
- `vocs/docs/pages/` — documentation pages (`.md` / `.mdx`).
- `vocs/docs/snippets/` — runnable Rust example sources, embedded into pages
  via `// [!include ~/snippets/...]`.

## License

Licensed under either of [Apache License, Version 2.0](../tronz/LICENSE-APACHE)
or [MIT license](../tronz/LICENSE-MIT) at your option.
