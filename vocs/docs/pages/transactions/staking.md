# Staking (Stake 2.0)

On TRON you obtain network resources — [energy and bandwidth](/primitives/resource-codes) —
by **staking** ("freezing") TRX. tronz implements the Stake 2.0 model with a set
of lazy builders.

## Freeze (stake)

`freeze_balance()` stakes TRX for a resource. It defaults to `Energy`.

```rust
use tronz::Trx;
use tronz::primitives::ResourceCode;

# async fn run(provider: impl tronz::TronProvider) -> anyhow::Result<()> {
let pending = provider
    .freeze_balance()
    .amount(Trx::from_trx(10.0)?)
    .resource(ResourceCode::Energy)
    .send()
    .await?;

let info = pending.get_receipt().await?;
println!("status: {:?}", info.status);
# Ok(()) }
```

## Delegate

Once staked, you can delegate the resulting resource to another account with
`delegate_resource()`. Cap the amount to what's actually delegatable using
`get_can_delegate_max`:

```rust
use tronz::Trx;
use tronz::primitives::ResourceCode;

# async fn run(provider: impl tronz::TronProvider, me: tronz::Address, receiver: tronz::Address) -> anyhow::Result<()> {
let max = provider.get_can_delegate_max(me, ResourceCode::Energy).await?;
let amount = Trx::from_trx(10.0)?.min(max);

let pending = provider
    .delegate_resource()
    .resource(ResourceCode::Energy)
    .amount(amount)
    .to(receiver)
    .send()
    .await?;
# Ok(()) }
```

You can optionally lock a delegation for a number of seconds with
`.lock_period(secs)` (max `864_000` per protocol). Reclaim a delegation with
`undelegate_resource()` (using `.from(addr)` for the delegatee).

## Claim rewards

`claim_rewards()` withdraws accrued block/vote rewards. TRON permits this at
most once per 24 hours per account, so check the pending reward first:

```rust
# async fn run(provider: impl tronz::TronProvider, me: tronz::Address) -> anyhow::Result<()> {
let reward = provider.get_reward(me).await?;
println!("pending reward: {}", reward);

if reward.as_sun() > 0 {
    let pending = provider.claim_rewards().send().await?;
    let info = pending.get_receipt().await?;
    println!("claimed: {:?}", info.status);
}
# Ok(()) }
```

## Unfreeze (unstake)

`unfreeze_balance()` begins releasing a stake. The funds enter an unbonding
window; once it expires, withdraw them with `withdraw_expire_unfreeze()`.

```rust
use tronz::Trx;
use tronz::primitives::ResourceCode;

# async fn run(provider: impl tronz::TronProvider) -> anyhow::Result<()> {
// Start unstaking.
provider
    .unfreeze_balance()
    .amount(Trx::from_trx(10.0)?)
    .resource(ResourceCode::Energy)
    .send()
    .await?;

// Later, after the unbonding window expires:
provider.withdraw_expire_unfreeze().send().await?;
# Ok(()) }
```

:::info
TRON allows at most **32** concurrent unfreeze windows per account. Use
`get_available_unfreeze_count(addr)` to check remaining slots, and
`get_can_withdraw_unfreeze_amount(addr, now_ms)` to see how much is withdrawable
right now. `cancel_all_unfreeze()` cancels all pending unfreezes and re-stakes
them.
:::

See the full runnable version in [Examples → Staking and delegation](/examples/stake).
