# SolidityNode provider

A TRON SolidityNode serves **solidified** state — blocks and receipts confirmed
by 2/3+ of the super representatives, which can no longer be reorged. Read it
through a `SolidityProvider`, a read-only companion to the FullNode
[`TronProvider`](/providers/introduction).

```rust
use tronz::{SolidityProvider, TRONGRID_MAINNET_SOLIDITY};
```

## Read-only by construction

`SolidityProvider` has no signer, no [fillers](/providers/fillers), and no
broadcast path, so trying to mutate state through it is a compile-time error —
not a runtime failure. It talks to the `WalletSolidity` service, which lives on a
different endpoint from the FullNode:

| Network | FullNode (`TronProvider`) | SolidityNode (`SolidityProvider`) |
| --- | --- | --- |
| Mainnet | `TRONGRID_MAINNET` | `TRONGRID_MAINNET_SOLIDITY` |
| Nile | `TRONGRID_NILE` | `TRONGRID_NILE_SOLIDITY` |

Because it only sees irreversible state, a SolidityNode lags the FullNode head by
the solidification window (~19 blocks).

## Connecting

```rust
use tronz::{SolidityProvider, TRONGRID_MAINNET_SOLIDITY};

# async fn run() -> anyhow::Result<()> {
let solidity = SolidityProvider::connect(TRONGRID_MAINNET_SOLIDITY).await?;

let head = solidity.get_now_block().await?;
println!("solidified head: {}", head.number);
# Ok(()) }
```

Use `SolidityProvider::builder()` when you need custom timeouts, retries,
failover endpoints, or a TronGrid API key:

```rust
use core::time::Duration;
use tronz::{SolidityProvider, TRONGRID_MAINNET_SOLIDITY};

# async fn run(api_key: Option<String>) -> anyhow::Result<()> {
let solidity = SolidityProvider::builder()
    .with_request_timeout(Duration::from_secs(10))
    .maybe_api_key(api_key)
    .connect(TRONGRID_MAINNET_SOLIDITY)
    .await?;
# Ok(()) }
```

## What you can read

The read surface mirrors the FullNode's, restricted to what `WalletSolidity`
exposes: `get_now_block`, `get_block_by_number`, `get_account`,
`get_transaction`, `get_transaction_info`, `get_transaction_info_by_block_num`,
`get_transaction_count_by_block_num`, `trigger_constant_contract`, and
`estimate_energy`.

```rust
# async fn run(solidity: tronz::SolidityProvider, address: tronz::Address) -> anyhow::Result<()> {
let account = solidity.get_account(address).await?;
println!("solidified balance: {} TRX", account.balance);
# Ok(()) }
```

## Waiting for finality

The provider polls for solidification. `wait_for_transaction` returns the receipt
once the transaction is irreversible; `wait_for_success` additionally fails if it
solidified but reverted:

```rust
# async fn run(solidity: tronz::SolidityProvider, tx_id: tronz::primitives::TxId) -> anyhow::Result<()> {
let receipt = solidity.wait_for_success(tx_id).await?;
println!("solidified in block {}", receipt.block_number);
# Ok(()) }
```

## Bridging from a broadcast

FullNode inclusion can still be reorged; solidified state cannot. A
`PendingTransaction` returned from a FullNode `.send()` can bridge straight to
finality against a `SolidityProvider`:

```rust
# async fn run(
#     full: impl tronz::TronProvider,
#     solidity: &tronz::SolidityProvider,
#     to: tronz::Address,
#     amount: tronz::Trx,
# ) -> anyhow::Result<()> {
let pending = full.send_trx().to(to).amount(amount).send().await?;

// Broadcast on the FullNode, then wait for irreversible success.
let receipt = pending.await_solidified_success(solidity).await?;
println!("final in block {}", receipt.block_number);
# Ok(()) }
```

See the runnable [SolidityNode examples](/examples/solidity/README).
