# Solidity bindings with `tron_sol!`

`tron_sol!` generates alloy-compatible Solidity types together with a
provider-bound contract instance for TRON. Use it when you have a Solidity
interface or JSON ABI and want typed calls, return values, and events.

:::warning
**Alpha API:** `tron_sol!` is currently experimental. Generated names,
attributes, and the provider-bound instance surface may change between minor
releases. Pin your
`tronz` version when using generated bindings in production and review the
changelog before upgrading.
:::

The macro is available with the `contract` feature, which is included in the
default `tronz` feature set:

```rust
use tronz::contract::tron_sol;
```

## Generate a typed instance

Add `#[sol(rpc)]` to generate a provider-bound `Instance` with one typed method
per Solidity function:

```rust
use tronz::contract::tron_sol;

tron_sol! {
    #[sol(rpc)]
    interface IToken {
        function name() external view returns (string);
        function balanceOf(address owner) external view returns (uint256);
        function transfer(address to, uint256 amount) external returns (bool);
        event Transfer(address indexed from, address indexed to, uint256 value);
    }
}
```

Bind it to an address and provider:

```rust
# async fn run(provider: impl tronz::TronProvider, address: tronz::Address) -> anyhow::Result<()> {
let token = IToken::new(address, provider);

let name = token.name().call().await?;
let balance = token.balanceOf(address).call().await?;
# Ok(()) }
```

The instance is generic over the provider's read capability, so binding to a
read-only [`SolidityProvider`](/providers/solidity-node) yields typed calls
against solidified state (the `.send()` write path is simply unavailable there).

Read-only calls use `.call().await`. When a `view` branches on `msg.sender`, set
it with `.caller(address)` on the call builder; without a signer it defaults to
the zero address. With a signer-backed provider, state-changing calls use
`.send().await` and return a
[`PendingTransaction`](/transactions/lifecycle):

```rust
# async fn run(token: IToken::Instance<impl tronz::TronProvider>, to: tronz::Address) -> anyhow::Result<()> {
let pending = token.transfer(to, tronz::U256::from(1u64)).send().await?;
let receipt = pending.get_receipt().await?;
# Ok(()) }
```

TRON `Address` values are accepted for Solidity `address` parameters. The
`0x41` prefix is removed for ABI encoding and restored when decoding a returned
address.

## JSON ABI files

The macro also accepts abigen-style JSON ABI input:

```rust
use tronz::contract::tron_sol;

tron_sol! {
    #[sol(rpc)]
    MyContract, "abi/MyContract.json"
}
```

Paths are resolved at compile time. The generated bindings are rebuilt when
the ABI changes.

## Typed events

An `#[sol(rpc)]` interface containing events generates a typed filter method:

```rust
# async fn run(token: IToken::Instance<impl tronz::TronProvider>, tx_id: tronz::primitives::TxId) -> anyhow::Result<()> {
let transfers = token
    .Transfer_filter()
    .address(token.address())
    .query_tx(tx_id)
    .await?;
# Ok(()) }
```

Filters can query one transaction with `query_tx` or all transaction receipts
in a block with `query_block`. TRON does not expose Ethereum's `eth_getLogs`, so
scan a block range by calling `query_block` for each block.

For complete runnable programs, see:

- [Type-safe bindings](/examples/sol-macro/tron_sol_bindings)
- [Generated event filters](/examples/sol-macro/tron_sol_events)

For contracts whose ABI is only known at runtime, use `Interface` and
`ContractInstance` instead of `tron_sol!`; see the
[dynamic ABI example](/examples/contracts/contract_dynamic_abi).
