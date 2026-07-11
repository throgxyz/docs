# Installation

[tronz](https://github.com/throgxyz/tronz) is published as a meta-crate that
re-exports its sub-crates. Its default feature set includes the TLS gRPC
provider, contract support, and the local signer:

```sh
cargo add tronz
```

Or add it to your `Cargo.toml` directly:

```toml
[dependencies]
tronz = "0.3"
```

tronz is async-first and built on [tokio](https://tokio.rs), so you will also
want the runtime:

```sh
cargo add tokio --features full
```

## Features

The `tronz` meta-crate exposes additional functionality behind feature flags so
you only compile what you use. `full` is currently an alias for the default
feature set; mnemonic, keystore, and AWS support remain opt-in:

| Feature | Enables |
| --- | --- |
| `full` | The default feature set: TLS gRPC transport, contracts, and local signer |
| `provider-grpc-tls` | The provider and gRPC transport with TLS support |
| `provider-grpc` | The provider and gRPC transport without enabling TLS |
| `contract` | TRC20 / TRC721 bindings and `tron_sol!` |
| `signer-local` | `LocalSigner` (included in the default feature set) |
| `signer-mnemonic` | BIP-39 mnemonic and BIP-44 HD key derivation |
| `signer-keystore` | Web3 Secret Storage V3 keystore support |
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
