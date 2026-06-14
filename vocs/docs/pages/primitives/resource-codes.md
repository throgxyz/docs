# Resource codes

On TRON, you don't pay gas in the native coin the way you do on Ethereum.
Instead you stake ("freeze") TRX to obtain network **resources**. The
`ResourceCode` enum identifies which resource an operation concerns.

```rust
use tronz::primitives::ResourceCode;
```

| Variant | Discriminant | Meaning |
| --- | --- | --- |
| `ResourceCode::Bandwidth` | `0` | Network bandwidth (free daily allowance + staked) |
| `ResourceCode::Energy` | `1` | Consumed when executing smart contracts |
| `ResourceCode::TronPower` | `2` | Voting weight gained from staking |

The discriminants match the protobuf `ResourceCode` enum, so values are used
directly when building staking and delegation parameters.

```rust
use tronz::primitives::ResourceCode;

ResourceCode::Energy.as_i32();      // 1
ResourceCode::from_i32(1);          // Some(ResourceCode::Energy)
ResourceCode::from_i32(9);          // None — unknown discriminant
```

## Default

`ResourceCode::default()` is `Energy`, since it is the most commonly
staked-for resource and matches the default used by the staking builders:

```rust
assert_eq!(ResourceCode::default(), ResourceCode::Energy);
```

## Usage

Resource codes appear throughout the staking API — when freezing, delegating,
or querying limits:

```rust
use tronz::primitives::ResourceCode;

# async fn run(provider: impl tronz::TronProvider, me: tronz::Address) -> anyhow::Result<()> {
// How much can this account still delegate, for each resource?
let max_energy = provider.get_can_delegate_max(me, ResourceCode::Energy).await?;
let max_bw = provider.get_can_delegate_max(me, ResourceCode::Bandwidth).await?;
# Ok(()) }
```

See [Staking (Stake 2.0)](/transactions/staking) for the full freeze / delegate
flow.
