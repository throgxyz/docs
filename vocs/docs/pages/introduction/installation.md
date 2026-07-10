# Installation

[tronz](https://github.com/throgxyz/tronz) is published as a meta-crate that
re-exports its sub-crates. The quickest way to get everything is the `full`
feature:

```sh
cargo add tronz --features full
```

Or add it to your `Cargo.toml` directly:

```toml
[dependencies]
tronz = { version = "0.3", features = ["full"] }
```

tronz is async-first and built on [tokio](https://tokio.rs), so you will also
want the runtime:

```sh
cargo add tokio --features full
```

## Features

The `tronz` meta-crate exposes its functionality behind feature flags so you
only compile what you use:

| Feature | Enables |
| --- | --- |
| `full` | Everything below |
| `provider` | The provider, gRPC transport, and fillers |
| `signer` | `TronSigner` and `LocalSigner` |
| `contract` | TRC20 / TRC721 bindings and `tron_sol!` (implies `provider`) |
| `signer-aws` | AWS KMS-backed `AwsSigner` |

For a complete and up-to-date list, see the
[`tronz` crate's `Cargo.toml`](https://github.com/throgxyz/tronz/blob/main/crates/tronz/Cargo.toml).

## Supported Rust versions (MSRV)

The minimum supported Rust version is **1.85**. tronz uses the Rust 2024
edition.

## Importing types

The most common types are re-exported at the crate root:

```rust
use tronz::{
    Address, Trx, U256,                          // primitives
    LocalSigner, TronSigner,                     // signers
    ProviderBuilder, TronProvider,               // providers
    TRONGRID_MAINNET, TRONGRID_NILE,             // endpoints
};
```

Specialized types live in their respective modules — for example
`tronz::primitives::ResourceCode`, `tronz::providers::*`, and
`tronz::contract::Trc20Ext`.
