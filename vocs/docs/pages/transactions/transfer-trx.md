# Transferring TRX

The `send_trx()` builder transfers native TRX from the signer to a recipient.

```rust
# async fn run(provider: impl tronz::TronProvider, to: tronz::Address) -> anyhow::Result<()> {
use tronz::Trx;

let pending = provider
    .send_trx()
    .to(to)
    .amount(Trx::from_sun(1_000_000)?)  // 1 TRX
    .send()
    .await?;

let info = pending.get_receipt().await?;
println!("status: {:?}", info.status);
# Ok(()) }
```

## Builder methods

| Method | Required? | Description |
| --- | --- | --- |
| `.to(Address)` | yes | Recipient |
| `.amount(Trx)` | yes | Amount to send |
| `.owner(Address)` | no | Sender; defaults to the signer's address |
| `.memo(impl Into<Vec<u8>>)` | no | Attach an on-chain memo |
| `.send()` | — | Fill, sign, broadcast |

`to` and `amount` are mandatory; omitting either returns a "missing field"
error from `.send()`.

## Adding a memo

```rust
# async fn run(provider: impl tronz::TronProvider, to: tronz::Address) -> anyhow::Result<()> {
# use tronz::Trx;
let pending = provider
    .send_trx()
    .to(to)
    .amount(Trx::from_trx(2.5)?)
    .memo("gm")
    .send()
    .await?;
# Ok(()) }
```

## A complete program

```rust
use tronz::{LocalSigner, ProviderBuilder, TronProvider, TronSigner, Trx, TRONGRID_NILE};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let signer = LocalSigner::from_hex(&std::env::var("TRON_PRIVATE_KEY")?)?;
    let from = signer.address();

    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .with_signer(signer)
        .on_grpc(TRONGRID_NILE)
        .await?;

    // Check the balance before sending.
    let before = provider.get_account(from).await?.balance;
    println!("balance: {} (before)", before);

    let pending = provider
        .send_trx()
        .to(from)                          // send to self for the demo
        .amount(Trx::from_sun(1_000_000)?) // 1 TRX
        .send()
        .await?;

    println!("tx_id: 0x{}", hex::encode(pending.tx_id()));

    let info = pending.get_receipt().await?;
    println!("confirmed in block {}: {:?}", info.block_number, info.status);

    Ok(())
}
```

See the full runnable version in [Examples → Transferring TRX](/examples/transfer_trx).
