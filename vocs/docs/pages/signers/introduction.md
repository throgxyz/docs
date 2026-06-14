# Signers

A **signer** holds (or has access to) a private key and produces signatures over
transaction hashes. tronz defines a small `TronSigner` trait so different
backends — in-memory keys, HSMs, remote signers — can be used interchangeably.

```rust
use tronz::{TronSigner, LocalSigner};
```

## The `TronSigner` trait

```rust
pub trait TronSigner {
    /// The address derived from this signer's key.
    fn address(&self) -> Address;

    /// Sign a 32-byte hash, returning a recoverable signature.
    fn sign_hash(
        &self,
        hash: B256,
    ) -> impl Future<Output = Result<RecoverableSignature, SignerError>> + Send;
}
```

Signing is **async** even for in-memory keys, so the same trait covers signers
that hit the network or dedicated hardware. tronz signs the transaction id — the
sha256 of the protobuf-encoded raw transaction — and attaches a 65-byte
recoverable signature.

## Implementations

| Type | Description |
| --- | --- |
| [`LocalSigner`](/signers/local-signer) | secp256k1 private key held in memory |
| `NoSigner` | A placeholder used by read-only providers; cannot sign |

A provider built without `.with_signer()` carries a `NoSigner`, so read calls
work but any `.send()` returns a "no signer" error.

## Attaching a signer to a provider

You rarely call a signer directly. Instead, hand it to the
[`ProviderBuilder`](/providers/provider-builder), which wires it into the filler
chain so transactions are signed automatically before broadcast:

```rust
use tronz::{LocalSigner, ProviderBuilder, TRONGRID_NILE};

# async fn run() -> anyhow::Result<()> {
let signer = LocalSigner::from_hex("PRIVATE_KEY_HEX")?;

let provider = ProviderBuilder::new()
    .with_recommended_fillers()
    .with_signer(signer)
    .on_grpc(TRONGRID_NILE)
    .await?;
# Ok(()) }
```
