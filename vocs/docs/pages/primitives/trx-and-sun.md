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
use tronz::primitives::parse_trx;

// From a raw sun value, rejecting negatives — prefer this for user input.
let a = Trx::from_sun(1_000_000)?;   // 1 TRX

// From a decimal TRX string — exact, no floating point.
let b: Trx = "1.5".parse()?;         // 1.5 TRX = 1_500_000 sun
let c = parse_trx("1.5")?;           // same, alloy-style free-function

// Zero.
let zero = Trx::ZERO;
```

Accepted decimal input follows alloy's unit helpers: `.5`, `1.`, `_`
separators, and an empty string are accepted. More than 6 fractional digits are
truncated rather than rounded:

```rust
assert_eq!(".5".parse::<Trx>()?.as_sun(), 500_000);
assert_eq!("1_000".parse::<Trx>()?.as_sun(), 1_000_000_000);
assert_eq!("1.0000009".parse::<Trx>()?.as_sun(), 1_000_000);
```

:::warning
`Trx::from_sun` returns `Result` and **rejects negative values**. Parsing a
string likewise rejects negatives and truncates fractional digits beyond sun
precision (6 places), matching alloy's `parse_units`.
:::

Amounts above `i64::MAX` sun are rejected because TRON protobuf amount fields
are signed 64-bit integers. The largest accepted value is
`9223372036854.775807` TRX.

## Reading amounts

```rust
let amount: Trx = "2.5".parse()?;

amount.as_sun(); // 2_500_000  (exact i64)
```

`Display` formats as a fixed-precision decimal with exactly 6 fractional digits
— exact (no `f64`) and with no unit suffix:

```rust
use tronz::primitives::format_trx;

println!("{}", Trx::from_sun(1_500_000)?);   // "1.500000"
let s = format_trx(Trx::from_sun(1)?);       // "0.000001"
```

## Arithmetic

`Trx` implements `Add` and `Sub`, which **panic on `i64` overflow or a negative
result**. Use the `checked_*` variants — which return `None` instead — whenever
a value could be out of range:

```rust
let a: Trx = "1".parse()?;
let b: Trx = "0.5".parse()?;

let sum = a + b;                 // 1.5 TRX  (panics on overflow)
let diff = a - b;                // 0.5 TRX  (panics if the result is negative)
let checked = a.checked_add(b);  // Some(1.5 TRX)
let under = b.checked_sub(a);    // None — would be negative
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
