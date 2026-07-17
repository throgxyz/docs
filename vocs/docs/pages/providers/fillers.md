# Fillers

A **filler** automatically populates fields on a transaction before it is signed
and broadcast — things the caller shouldn't have to compute by hand. tronz
borrows this pattern directly from alloy: you stack fillers on the
[`ProviderBuilder`](/providers/provider-builder), and they run on every
`.send()`.

## Why fillers exist

A TRON transaction needs more than just "to" and "amount". It must reference a
recent block (TAPOS, for replay protection and expiry), and contract operations
need a `fee_limit`. The node endpoints that build the currently supported
transactions already fill TAPOS for you, so the recommended set only adds a
default `fee_limit`. A `with_tapos()` filler is still available for cases where
you want tronz to fill those fields itself.

## The recommended set

For almost any read/write provider, start here:

```rust
use tronz::{LocalSigner, ProviderBuilder, TRONGRID_NILE};

# async fn run() -> anyhow::Result<()> {
# let signer = LocalSigner::from_hex("PRIVATE_KEY_HEX")?;
let provider = ProviderBuilder::new()
    .with_recommended_fillers()
    .with_signer(signer)
    .on_grpc(TRONGRID_NILE)
    .await?;
# Ok(()) }
```

`with_recommended_fillers()` is shorthand for:

```rust
# use tronz::{ProviderBuilder, Trx};
# fn run() -> Result<(), tronz::primitives::AmountError> {
# let _ =
ProviderBuilder::new()
    .with_fee_limit("20".parse::<Trx>()?); // 20 TRX
# Ok(()) }
```

It does **not** add the TAPOS filler: the node endpoints that build the
currently supported transactions already fill TAPOS. Add `with_tapos()`
explicitly if you build transactions that need tronz to fill those fields.

## Available fillers

| Filler | Added by | Fills |
| --- | --- | --- |
| TAPOS | `with_tapos()` | The reference block hash + expiration (required before broadcast) |
| Fee limit | `with_fee_limit(Trx)` | A default `fee_limit` for contract operations |
| Signer | `with_signer(s)` | Signs the transaction id before broadcast |

The signer is itself part of the filler chain — that's why a provider's ability
to `.send()` is encoded in its type. A builder without `.with_signer()` produces
a provider that can read but not send.

## Choosing a fee limit per call

The fee-limit filler sets a **default**. The fee limit is the maximum TRX you'll
spend if you don't have enough staked energy/bandwidth. Override it when needed
via the transaction builders (see [Transactions](/transactions/introduction)),
or set a different default:

```rust
use tronz::{ProviderBuilder, Trx, TRONGRID_NILE};

# async fn run() -> anyhow::Result<()> {
let provider = ProviderBuilder::new()
    .with_fee_limit("100".parse()?)  // higher cap for heavy contract calls
    .on_grpc(TRONGRID_NILE)
    .await?;
# Ok(()) }
```

## Estimating energy first

For contract calls you can estimate the energy cost before sending, so you can
pick a sensible `fee_limit` — analogous to `estimate_gas` in alloy:

```rust
# async fn run(provider: impl tronz::TronProvider, params: tronz::providers::types::TriggerSmartContract) -> anyhow::Result<()> {
let energy = provider.estimate_energy(params).await?;
# Ok(()) }
```
