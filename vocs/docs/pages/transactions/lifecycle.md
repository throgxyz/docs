# Transaction lifecycle

A write goes through four stages. The builders and `PendingTransaction` hide
most of the work, but it helps to know what happens under the hood.

```
 build → fill + sign → broadcast → confirm
builder    on send()    on send()   get_receipt()
```

1. **Build.** A builder (e.g. `send_trx()`) collects your fields. No I/O yet.
2. **Fill + sign.** On `.send()`, the [filler](/providers/fillers) chain adds
   the reference block (TAPOS) and `fee_limit`, the signer signs the
   transaction id, and...
3. **Broadcast.** ...the signed transaction is sent to the node. `.send()`
   resolves to a `PendingTransaction`.
4. **Confirm.** Await the receipt with `.get_receipt()`.

## Sending

```rust
# async fn run(provider: impl tronz::TronProvider, to: tronz::Address) -> anyhow::Result<()> {
# use tronz::Trx;
let pending = provider
    .send_trx()
    .to(to)
    .amount(Trx::from_sun(1_000_000)?)
    .send()
    .await?;

// The transaction id is available immediately after broadcast.
println!("tx_id: {:#x}", pending.tx_id());
# Ok(()) }
```

## Waiting for confirmation

`get_receipt()` polls the node until the transaction is indexed (every 3
seconds, up to ~60 seconds), then returns the `TransactionInfo` receipt:

```rust
# async fn run(pending: tronz::providers::PendingTransaction<impl tronz::TronProvider>) -> anyhow::Result<()> {
let info = pending.get_receipt().await?;

println!("block       : {}", info.block_number);
println!("status      : {:?}", info.status);       // Success | Failed
println!("energy used : {}", info.energy_usage);
println!("net used    : {}", info.net_usage);
println!("net fee     : {} sun", info.net_fee.as_sun());
# Ok(()) }
```

`get_receipt()` is an alias for `await_confirmed()`, mirroring alloy. To control
the polling interval and attempt count, use `await_confirmed_with`:

```rust
use std::time::Duration;

# async fn run(pending: tronz::providers::PendingTransaction<impl tronz::TronProvider>) -> anyhow::Result<()> {
let info = pending
    .await_confirmed_with(Duration::from_secs(2), 30)
    .await?;
# Ok(()) }
```

If the transaction isn't confirmed within the limit, you get
`PendingTransactionError::ConfirmationTimeout` — the transaction may still
confirm later, so you can re-query it with `get_transaction_info(tx_id)` (which
returns `None` until it is indexed).

## Reading the receipt

`TransactionInfo` carries everything about the confirmed transaction:

| Field | Meaning |
| --- | --- |
| `status` | `TxStatus::Success` or `Failed` |
| `block_number` / `block_timestamp` | Where/when it was included |
| `energy_usage` / `energy_fee` | Energy consumed and TRX burned for energy |
| `net_usage` / `net_fee` | Bandwidth consumed and TRX burned for bandwidth |
| `contract_result` | Detailed VM result (`Success`, `Revert`, `OutOfEnergy`, …) |
| `revert_reason` | Decoded revert string, if the contract reverted |
| `logs` | Emitted event logs |
| `contract_address` | Set for contract-deploy transactions |

For contract calls, always check both `status` and `contract_result` — a
transaction can be on-chain (`status: Success` at the network level) while the
contract itself reverted.
