# Providers

A **provider** is your handle to a TRON node. It exposes read methods (account
state, blocks, resources), lazy builders for write operations, and the low-level
send/broadcast primitives. The whole surface is defined by the `TronProvider`
trait.

```rust
use tronz::{ProviderBuilder, TronProvider};
```

## Anatomy

tronz separates concerns into layers — closely mirroring alloy:

| Piece | Role |
| --- | --- |
| [`ProviderBuilder`](/providers/provider-builder) | Assembles fillers + signer, then binds a transport |
| `RootProvider` | The base provider over a transport — reads only |
| `FilledProvider` | A `RootProvider` wrapped with a [filler](/providers/fillers) chain; this is what you use |
| [transport](/providers/grpc-transport) | The gRPC connection to the node |

`ProviderBuilder::new().on_grpc(uri)` produces a `FilledProvider`, which
implements `TronProvider`.

## What you can do

```rust
use tronz::{ProviderBuilder, TronProvider, TRONGRID_MAINNET};

# async fn run() -> anyhow::Result<()> {
let provider = ProviderBuilder::new().on_grpc(TRONGRID_MAINNET).await?;

// Reads (no signer required)
let block = provider.get_now_block().await?;
let account = provider.get_account("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".parse()?).await?;

// Lazy write builders (require a signer to `.send()`)
// provider.send_trx()...
// provider.freeze_balance()...
// provider.delegate_resource()...
# Ok(()) }
```

- See [Reading chain state](/providers/queries) for the full list of read
  methods.
- See [Transactions](/transactions/introduction) for the write builders.

## Cloning

`TronProvider` requires `Clone + Send + Sync + 'static`. Providers are cheap to
clone (the transport is shared), so pass clones freely across tasks rather than
wrapping in `Arc` yourself.
