# Getting Started

This guide walks you from an empty project to reading chain state and sending
your first transaction on the TRON **Nile testnet**.

## 1. Create a project

```sh
cargo new tronz-demo
cd tronz-demo
cargo add tronz --features full
cargo add tokio --features full
cargo add anyhow
```

## 2. Connect and read

tronz talks gRPC to a TRON node. The crate ships well-known TronGrid endpoints,
`TRONGRID_MAINNET` and `TRONGRID_NILE` (testnet). Build a provider and read the
latest block:

```rust
use tronz::{ProviderBuilder, TronProvider, TRONGRID_NILE};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let provider = ProviderBuilder::new().on_grpc(TRONGRID_NILE).await?;

    let block = provider.get_now_block().await?;
    println!("latest block: {} ({} ms)", block.number, block.timestamp);

    Ok(())
}
```

Reads need no signer. To check an account balance:

```rust
let address: tronz::Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".parse()?;
let account = provider.get_account(address).await?;
println!("balance: {} TRX", account.balance);
```

## 3. Add a signer and send TRX

Writing to the chain requires a [signer](/signers/introduction). Attach one with
`.with_signer()`, and add `.with_recommended_fillers()` so tronz fills in the
reference block (TAPOS) and a default fee limit for you:

```rust
use tronz::{LocalSigner, ProviderBuilder, TronProvider, TronSigner, Trx, TRONGRID_NILE};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load a private key (hex). Never hard-code real keys.
    let signer = LocalSigner::from_hex(&std::env::var("TRON_PRIVATE_KEY")?)?;
    let from = signer.address();

    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .with_signer(signer)
        .on_grpc(TRONGRID_NILE)
        .await?;

    // Lazy builder — no I/O until `.send()`.
    let pending = provider
        .send_trx()
        .to(from)                       // send to self for the demo
        .amount(Trx::from_sun(1_000_000)?) // 1 TRX
        .send()
        .await?;

    println!("tx_id: {:#x}", pending.tx_id());

    // Wait for the transaction to be confirmed.
    let receipt = pending.get_receipt().await?;
    println!("confirmed in block {}: {:?}", receipt.block_number, receipt.status);

    Ok(())
}
```

:::tip
Get free test TRX from the [Nile faucet](https://nileex.io/join/getJoinPage)
to fund your account before sending.
:::

## Next steps

- Understand the core types in [Primitives](/primitives/introduction).
- Learn how providers are composed in [Provider builder](/providers/provider-builder).
- Follow the [transaction lifecycle](/transactions/lifecycle) from build to receipt.
- Interact with tokens in [TRC20 tokens](/contracts/trc20).
- Browse runnable [Examples](/examples/queries/query).
