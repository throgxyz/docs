# Local signer

`LocalSigner` holds a secp256k1 private key in memory, backed by a
[`k256`](https://docs.rs/k256) signing key. It is the signer you'll use for most
development and server-side scenarios.

```rust
use tronz::LocalSigner;
```

## Constructing

```rust
use tronz::LocalSigner;

// From a hex string (with or without the `0x` prefix).
let signer = LocalSigner::from_hex("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")?;

// From raw 32 bytes.
let bytes = [0u8; 32];
let signer = LocalSigner::from_bytes(&bytes)?;
```

The TRON address is derived from the key's public key automatically:

```rust
use tronz::{LocalSigner, TronSigner};

let signer = LocalSigner::from_hex(&std::env::var("TRON_PRIVATE_KEY")?)?;
println!("address: {}", signer.address());
```

:::warning
Never hard-code real private keys. Load them from the environment, a secrets
manager, or an encrypted store. `LocalSigner`'s `Debug` impl deliberately omits
the key so it won't leak into logs.
:::

## Signing

You typically let the provider sign for you, but you can sign a hash directly:

```rust
use tronz::{LocalSigner, TronSigner};
use tronz::primitives::B256;

# async fn run() -> anyhow::Result<()> {
let signer = LocalSigner::from_hex("PRIVATE_KEY_HEX")?;
let sig = signer.sign_hash(B256::repeat_byte(0xab)).await?;

sig.to_bytes();  // [u8; 65] recoverable signature
sig.v();         // recovery id: 0 or 1
# Ok(()) }
```

## Accessing the key material

If you need the underlying `k256` key (for interop or custom crypto), it is
exposed — along with the `k256` crate itself:

```rust
use tronz::signers::k256;

# fn run(signer: &tronz::LocalSigner) {
let key: &k256::ecdsa::SigningKey = signer.signing_key();
# }
```

## Use with a provider

```rust
use tronz::{LocalSigner, ProviderBuilder, TRONGRID_NILE};

# async fn run() -> anyhow::Result<()> {
let signer = LocalSigner::from_hex(&std::env::var("TRON_PRIVATE_KEY")?)?;

let provider = ProviderBuilder::new()
    .with_recommended_fillers()
    .with_signer(signer)
    .on_grpc(TRONGRID_NILE)
    .await?;
# Ok(()) }
```
