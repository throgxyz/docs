# gRPC transport

tronz speaks to TRON nodes over **gRPC** (the protobuf wallet API), rather than
the HTTP/JSON API. The transport is created for you when you call `.on_grpc()`
on the builder, so you usually don't touch it directly.

## Endpoints

The crate ships constants for the well-known TronGrid endpoints:

```rust
use tronz::{TRONGRID_MAINNET, TRONGRID_NILE};
```

| Constant | Network |
| --- | --- |
| `TRONGRID_MAINNET` | TRON mainnet |
| `TRONGRID_NILE` | Nile testnet |

Use the Nile testnet for development — you can get free test TRX from the
[Nile faucet](https://nileex.io/join/getJoinPage).

```rust
use tronz::{ProviderBuilder, TRONGRID_NILE};

# async fn run() -> anyhow::Result<()> {
let provider = ProviderBuilder::new().on_grpc(TRONGRID_NILE).await?;
# Ok(()) }
```

## Custom endpoints

Any gRPC URI works — including your own node:

```rust
# async fn run() -> anyhow::Result<()> {
# use tronz::ProviderBuilder;
// TLS endpoint
let mainnet = ProviderBuilder::new()
    .on_grpc("https://grpc.trongrid.io:443")
    .await?;

// Local node over plain HTTP/2
let local = ProviderBuilder::new()
    .on_grpc("http://127.0.0.1:50051")
    .await?;
# Ok(()) }
```

## Low-level access

The transport layer is exposed under `tronz::transports` if you need it, and the
endpoint constants live under `tronz::transports::grpc`. Most applications never
import from here — prefer the [provider builder](/providers/provider-builder).

```rust
use tronz::transports::grpc::{TRONGRID_MAINNET, TRONGRID_NILE};
```
