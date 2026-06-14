# TRX and sun

TRON denominates value in **sun**, where `1 TRX = 1_000_000 sun`. The `Trx` type
wraps an `i64` sun value to match the protobuf `sint64` representation used
on-chain.

```rust
use tronz::Trx;
```

The constant `tronz::primitives::SUN_PER_TRX` (= `1_000_000`) is available if you
need it.

## Constructing amounts

```rust
use tronz::Trx;

// From sun, rejecting negatives — prefer this for user input.
let a = Trx::from_sun(1_000_000)?;        // 1 TRX

// From a floating-point TRX value.
let b = Trx::from_trx(1.5)?;              // 1.5 TRX = 1_500_000 sun

// Zero.
let zero = Trx::ZERO;
```

:::warning
`Trx::from_sun` and `Trx::from_trx` return `Result` and **reject negative or
non-finite values**. There is also `Trx::from_sun_unchecked`, which allows
negative values — it exists only so malformed on-chain data round-trips without
panicking. Don't use it for user-facing input.
:::

## Reading amounts

```rust
let amount = Trx::from_sun(2_500_000)?;

amount.as_sun(); // 2_500_000  (exact i64)
amount.as_trx(); // 2.5        (f64, lossy for very large amounts)
```

`Display` formats as TRX:

```rust
println!("{}", Trx::from_sun(1_500_000)?); // "1.5 TRX"
```

## Arithmetic

`Trx` implements `Add` and `Sub`, plus checked variants that return `None` on
`i64` overflow:

```rust
let a = Trx::from_trx(1.0)?;
let b = Trx::from_trx(0.5)?;

let sum = a + b;                  // 1.5 TRX
let diff = a - b;                 // 0.5 TRX
let checked = a.checked_add(b);   // Some(1.5 TRX)
```

It is also `Ord`, so amounts compare and `min`/`max` directly — handy when
capping a delegation to the maximum delegatable amount:

```rust
let delegate_amount = amount.min(max_delegatable);
```

## Token amounts vs TRX

`Trx` is for the **native** TRX/sun unit only. TRC20 token amounts are raw
`uint256` values and use [`U256`](/primitives/introduction) instead — apply the
token's own `decimals()` to interpret them. See [TRC20 tokens](/contracts/trc20).
