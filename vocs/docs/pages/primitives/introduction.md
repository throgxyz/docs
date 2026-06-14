# Primitives

The `tronz-primitives` crate (re-exported as `tronz::primitives`) defines the
core value types every other crate builds on. They are small, `Copy` where
possible, and serde-friendly.

| Type | Purpose |
| --- | --- |
| [`Address`](/primitives/address) | A TRON network address (`0x41` prefix + 20 bytes) |
| [`Trx`](/primitives/trx-and-sun) | A TRX amount, stored as `i64` sun |
| [`ResourceCode`](/primitives/resource-codes) | Bandwidth / Energy / TRON Power |
| `RecoverableSignature` | A 65-byte recoverable secp256k1 signature |
| `TxId` | A transaction id (`B256` = sha256 of the raw tx) |

## Reused from alloy

TRON shares Ethereum's big-integer and ABI machinery, so tronz re-exports these
types directly from `alloy-primitives` rather than redefining them:

```rust
pub use alloy_primitives::{keccak256, Bytes, B256, U256};
```

That means a `U256` from tronz **is** an alloy `U256` — values flow between the
two ecosystems without conversion. The most common ones, `Address`, `Trx`, and
`U256`, are re-exported at the crate root:

```rust
use tronz::{Address, Trx, U256};
```

Everything else is available under `tronz::primitives`:

```rust
use tronz::primitives::{ResourceCode, RecoverableSignature, TxId};
```
