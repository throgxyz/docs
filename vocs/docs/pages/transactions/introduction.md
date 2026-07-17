# Transactions

Write operations in tronz go through **lazy builders**. Each builder is returned
by a method on the provider, lets you set fields fluently, and performs **no
I/O** until you call `.send()`. At that point tronz fills in chain-dependent
fields, signs the transaction, and broadcasts it — returning a
[`PendingTransaction`](/transactions/lifecycle).

```rust
# async fn run(provider: impl tronz::TronProvider, to: tronz::Address) -> anyhow::Result<()> {
# use tronz::Trx;
let pending = provider
    .send_trx()              // returns a TransferBuilder
    .to(to)                  // set fields...
    .amount(Trx::from_sun(1_000_000)?)
    .send()                  // ...now it does I/O
    .await?;
# Ok(()) }
```

## Available builders

All of these are methods on `TronProvider`:

| Method | Operation |
| --- | --- |
| `send_trx()` | Transfer TRX |
| `freeze_balance()` | Stake TRX for a resource (Stake 2.0) |
| `unfreeze_balance()` | Unstake TRX |
| `delegate_resource()` | Delegate staked energy/bandwidth to another account |
| `undelegate_resource()` | Reclaim a delegation |
| `withdraw_expire_unfreeze()` | Withdraw TRX from expired unfreeze windows |
| `cancel_all_unfreeze()` | Cancel all pending unfreezes |
| `claim_rewards()` | Withdraw accrued block/vote rewards |
| `vote_witness()` | Vote for super representatives |
| `create_account()` | Activate a new account on-chain |
| `update_account_name()` | Set the account's on-chain name |
| `update_permissions()` | Update multisig permissions |

See [Transferring TRX](/transactions/transfer-trx) and
[Staking](/transactions/staking) for worked examples.

## Requirements for sending

Every `.send()` needs:

1. **A signer** — attach one with `.with_signer()` on the
   [builder](/providers/provider-builder). Without it, `.send()` returns a
   "no signer" error.
2. **(recommended) A fee limit** for contract operations — add one with
   `.with_fee_limit()` or `.with_recommended_fillers()`. TAPOS (the recent-block
   reference every TRON transaction needs) is filled by the node endpoint that
   builds the transaction, so no client-side filler is required for it; add
   `.with_tapos()` only if you want tronz to fill those fields itself.

The `owner` (sender) defaults to the signer's address, so you rarely set it
explicitly. You can override it with `.owner(addr)` when signing on behalf of
another account (e.g. multisig).

## The low-level path

The builders are sugar over `send_transaction(req)`, which takes a fully-formed
`TransactionRequest`. If you've constructed a request yourself, you can also
`broadcast(signed_tx)` an already-signed transaction. Most code should prefer
the builders.
