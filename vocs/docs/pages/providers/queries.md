# Reading chain state

Every `TronProvider` exposes a set of read methods. None of them require a
signer — a plain `ProviderBuilder::new().on_grpc(...)` provider can run them
all.

## Blocks

```rust
# async fn run(provider: impl tronz::TronProvider) -> anyhow::Result<()> {
let block = provider.get_now_block().await?;
println!("number    : {}", block.number);
println!("timestamp : {} ms", block.timestamp);
println!("hash      : 0x{}", hex::encode(block.hash));
# Ok(()) }
```

`BlockInfo` carries the `number`, `hash` (`B256`), and `timestamp`.

## Accounts

```rust
# async fn run(provider: impl tronz::TronProvider, address: tronz::Address) -> anyhow::Result<()> {
let account = provider.get_account(address).await?;

println!("balance   : {} TRX", account.balance);
println!("name      : {}", account.name);
println!("activated : {}", account.is_activated);

// Stake 2.0 frozen balances
for f in &account.frozen_v2 {
    println!("staked {} for {:?}", f.amount, f.resource);
}
# Ok(()) }
```

`AccountInfo` also exposes `unfrozen_v2` (in-progress unfreezes), `votes`,
`permissions` (multisig), and `trc10_balances`.

## Resources

```rust
# async fn run(provider: impl tronz::TronProvider, address: tronz::Address) -> anyhow::Result<()> {
let res = provider.get_account_resource(address).await?;

println!("bandwidth : {}/{}", res.bandwidth_used, res.bandwidth_limit);
println!("energy    : {}/{}", res.energy_used, res.energy_limit);
println!("tron power: {}", res.tron_power_used);
# Ok(()) }
```

`AccountResource` separates free vs. staked bandwidth, energy, delegated-out
totals, received-via-delegation totals, and TRON Power limits.

## Delegations and staking limits

```rust
use tronz::primitives::ResourceCode;

# async fn run(provider: impl tronz::TronProvider, address: tronz::Address) -> anyhow::Result<()> {
// Who is this account delegating to / receiving from?
let idx = provider.get_delegated_resource_index(address).await?;
println!("delegating to  : {} accounts", idx.to_accounts.len());
println!("receiving from : {} accounts", idx.from_accounts.len());

// Max still delegatable, per resource.
let max_energy = provider.get_can_delegate_max(address, ResourceCode::Energy).await?;

// Unclaimed staking rewards.
let reward = provider.get_reward(address).await?;
println!("pending reward : {}", reward);
# Ok(()) }
```

## Transactions and receipts

```rust
# async fn run(provider: impl tronz::TronProvider, tx_id: tronz::primitives::TxId) -> anyhow::Result<()> {
let tx = provider.get_transaction(tx_id).await?;

// `get_transaction_info` returns `None` until the node has indexed the tx.
let info = provider
    .get_transaction_info(tx_id)
    .await?
    .ok_or_else(|| anyhow::anyhow!("transaction not found or not yet confirmed"))?;

println!("block  : {}", info.block_number);
println!("status : {:?}", info.status);
println!("energy : {}", info.energy_usage);
# Ok(()) }
```

`get_transaction_info` returns `Option<TransactionInfo>` — `None` while the
transaction is still unconfirmed. Once present, `TransactionInfo` is the
receipt: block number/timestamp, `status`
(`Success`/`Failed`), energy and bandwidth usage and fees, the detailed
`contract_result`, emitted `logs`, and a `revert_reason` when a contract
reverts. See [Transaction lifecycle](/transactions/lifecycle).

## Other reads

| Method | Returns |
| --- | --- |
| `chain_parameters()` | `HashMap<String, i64>` of network parameters |
| `get_contract_info(addr)` | Contract metadata incl. deployed bytecode |
| `list_witnesses()` | All super representatives and candidates |
| `get_can_withdraw_unfreeze_amount(addr, ts_ms)` | TRX withdrawable from expired unfreezes |
| `get_available_unfreeze_count(addr)` | Remaining unfreeze slots (max 32) |
| `estimate_energy(params)` | Estimated energy for a contract call |
