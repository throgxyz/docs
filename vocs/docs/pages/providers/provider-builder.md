# Provider builder

`ProviderBuilder` assembles a provider step by step: you stack
[fillers](/providers/fillers), optionally attach a
[signer](/signers/introduction), set an API key, and finally bind a transport by
connecting. This mirrors alloy's `ProviderBuilder` + `JoinFill` pattern.

```rust
use tronz::ProviderBuilder;
```

## A minimal read-only provider

```rust
use tronz::{ProviderBuilder, TronProvider, TRONGRID_MAINNET};

# async fn run() -> anyhow::Result<()> {
let provider = ProviderBuilder::new()
    .on_grpc(TRONGRID_MAINNET)
    .await?;
# Ok(()) }
```

`ProviderBuilder::new()` starts with no fillers (an `Identity` filler). That's
enough to read chain state.

## A read/write provider

To send transactions you need two things: a way to fill in chain-dependent
fields, and a signer.

```rust
use tronz::{LocalSigner, ProviderBuilder, TRONGRID_NILE};

# async fn run() -> anyhow::Result<()> {
let signer = LocalSigner::from_hex(&std::env::var("TRON_PRIVATE_KEY")?)?;

let provider = ProviderBuilder::new()
    .with_recommended_fillers()   // TAPOS + default 20 TRX fee limit
    .with_signer(signer)          // sign before broadcast
    .on_grpc(TRONGRID_NILE)
    .await?;
# Ok(()) }
```

## Builder methods

| Method | Effect |
| --- | --- |
| `with_recommended_fillers()` | Adds the TAPOS filler **and** a 20 TRX default fee-limit filler |
| `with_tapos()` | Adds only the TAPOS filler (reference block, required before broadcast) |
| `with_fee_limit(Trx)` | Sets a default `fee_limit` for contract operations |
| `with_signer(signer)` | Attaches a signer so `.send()` works |
| `maybe_api_key(Option<...>)` | Optionally attach a TronGrid API key |

`with_recommended_fillers()` is equivalent to adding TAPOS and calling
`with_fee_limit("20".parse::<Trx>()?)`. See
[Fillers](/providers/fillers) for what each one does.

## API keys

TronGrid rate-limits anonymous traffic. `maybe_api_key` takes an `Option`, so
you can pass an env var straight through without a `match`:

```rust
use tronz::{ProviderBuilder, TRONGRID_MAINNET};

# async fn run() -> anyhow::Result<()> {
let api_key: Option<String> = std::env::var("TRON_API_KEY").ok();

let provider = ProviderBuilder::new()
    .maybe_api_key(api_key)
    .on_grpc(TRONGRID_MAINNET)
    .await?;
# Ok(()) }
```

If you always have a key, use the convenience connector:

```rust
# async fn run() -> anyhow::Result<()> {
# use tronz::{ProviderBuilder, TRONGRID_MAINNET};
let provider = ProviderBuilder::new()
    .on_grpc_with_key(TRONGRID_MAINNET, "your-api-key")
    .await?;
# Ok(()) }
```

## Connecting

`on_grpc(uri)` opens the gRPC connection and returns the provider. `uri`
examples:

- `"https://grpc.trongrid.io:443"` — TronGrid mainnet (TLS)
- `"http://127.0.0.1:50051"` — a local node (plain HTTP/2)

`connect(uri)` is an alias for `on_grpc(uri)`, and `connect_with_key(uri, key)`
aliases `on_grpc_with_key`. The crate constants `TRONGRID_MAINNET` and
`TRONGRID_NILE` cover the common endpoints — see
[gRPC transport](/providers/grpc-transport).
