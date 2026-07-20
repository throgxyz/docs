# TRC20 tokens

TRC20 is byte-for-byte compatible with the EVM ERC20 ABI, so tronz generates the
full interface with alloy's `sol!` macro — no JSON ABI required. The easiest way
in is the `Trc20Ext` trait, which adds a `.trc20()` method to any provider.

```rust
use tronz::contract::Trc20Ext;
```

## Binding to a token

```rust
# async fn run(provider: impl tronz::TronProvider + Clone) -> anyhow::Result<()> {
use tronz::contract::Trc20Ext;

let usdt: tronz::Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".parse()?;
let token = provider.trc20(usdt);
# Ok(()) }
```

`provider.trc20(address)` returns a `Trc20Instance` bound to that contract.
`.trc20()` is available on any read provider, so a
[`SolidityProvider`](/providers/solidity-node) yields an instance that reads
solidified state (see the
[solidified TRC20 example](/examples/solidity/solidity_trc20)).

## Reading token data

All reads are constant calls — no signer required:

```rust
# async fn run(token: tronz::contract::Trc20Instance<impl tronz::TronProvider>, who: tronz::Address) -> anyhow::Result<()> {
let name = token.name().await?;             // String
let symbol = token.symbol().await?;         // String
let decimals = token.decimals().await?;     // u8
let supply = token.total_supply().await?;   // U256
let balance = token.balance_of(who).await?; // U256
# Ok(()) }
```

`balance_of`, `total_supply`, and `allowance` return raw `U256` values. Apply
the token's `decimals()` to display them in human terms.

## Transferring tokens

Writes require a signer on the provider and consume energy. `transfer` returns a
[`PendingTransaction`](/transactions/lifecycle):

```rust
use tronz::U256;

# async fn run(token: tronz::contract::Trc20Instance<impl tronz::TronProvider>, to: tronz::Address) -> anyhow::Result<()> {
let pending = token.transfer(to, U256::from(1_000_000u64)).await?;

let info = pending.get_receipt().await?;
println!("status         : {:?}", info.status);
println!("contract result: {:?}", info.contract_result);
if let Some(reason) = &info.revert_reason {
    println!("revert reason  : {reason}");
}
# Ok(()) }
```

:::warning
For contract calls, check **both** `status` and `contract_result`. A transaction
can be on-chain (`status: Success`) while the contract itself reverted or ran
out of energy (`contract_result: Revert` / `OutOfEnergy`).
:::

## Approvals

```rust
use tronz::U256;

# async fn run(token: tronz::contract::Trc20Instance<impl tronz::TronProvider>, owner: tronz::Address, spender: tronz::Address) -> anyhow::Result<()> {
// Approve a spender.
token.approve(spender, U256::from(1_000_000u64)).await?;

// Check the current allowance.
let allowed = token.allowance(owner, spender).await?;

// Move tokens you've been approved for.
token.transfer_from(owner, spender, U256::from(500_000u64)).await?;
# Ok(()) }
```

## Encoding helpers

If you need the raw calldata (e.g. to build a transaction manually or estimate
energy), the `trc20` module exposes encode/decode functions and the generated
`ITRC20` interface:

```rust
use tronz::contract::trc20::{encode_transfer, encode_balance_of};
use tronz::U256;

# fn run(to: tronz::Address, who: tronz::Address) {
let calldata = encode_transfer(to, U256::from(1u64));
let bal_call = encode_balance_of(who);
# }
```

See the full runnable version in [Examples → TRC20](/examples/trc20/trc20).
