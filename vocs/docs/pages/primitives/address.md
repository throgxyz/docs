# Address

A TRON address is **21 bytes**: a single `0x41` prefix byte followed by the
20-byte EVM-style body (`keccak256(pubkey)[12..]`). It is most commonly shown in
base58check form — the familiar `T...` string.

```rust
use tronz::Address;
```

## Parsing

`Address` implements `FromStr`, and auto-detects the format. A base58check
(`T...`) string and a hex (`41...` / `0x41...`) string both parse to the same
address:

```rust
use tronz::Address;

// base58check — the canonical display form
let a: Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".parse()?;

// hex, with or without the `0x` prefix (must include the 0x41 prefix byte)
let b: Address = "41a614f803b6fd780986a42c78ec9c7f77e6ded13c".parse()?;
let c: Address = "0x41a614f803b6fd780986a42c78ec9c7f77e6ded13c".parse()?;

assert_eq!(a, b);
assert_eq!(a, c);
```

You can also use the explicit constructors when you know the format:

```rust
let a = Address::from_base58("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t")?;
let b = Address::from_hex("41a614f803b6fd780986a42c78ec9c7f77e6ded13c")?;
```

## From raw bytes

```rust
use tronz::Address;

// 21-byte full form (validates the 0x41 prefix)
let full = [0x41u8; 21];
let a = Address::from_bytes(full)?;

// 21-byte slice (validates length and prefix)
let b = Address::from_slice(&full)?;

// 20-byte EVM body — the 0x41 prefix is prepended for you
let evm = [0u8; 20];
let c = Address::from_evm_bytes(evm);
```

## From a public key

Addresses are derived from a secp256k1 public key the same way as Ethereum,
then prefixed with `0x41`:

```rust
use tronz::Address;
use tronz::signers::k256::ecdsa::VerifyingKey;

# fn run(vk: &VerifyingKey) {
let address = Address::from_public_key(vk);
# }
```

## Encoding

```rust
let a: tronz::Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".parse()?;

a.to_base58();    // "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
a.to_hex();       // "41a614f803b6fd780986a42c78ec9c7f77e6ded13c"
a.as_bytes();     // &[u8; 21] — full form, incl. 0x41 prefix
a.as_evm_bytes(); // &[u8; 20] — body only, for ABI / alloy bridging
```

`Display` uses base58check, so `println!("{address}")` prints the `T...` form.

## Bridging to alloy

TRON addresses and EVM addresses are the same 20 bytes under the prefix, so
`Address` converts to and from `alloy_primitives::Address`:

```rust
let tron: tronz::Address = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".parse()?;

// strip the 0x41 prefix → 20-byte EVM address
let evm: alloy_primitives::Address = tron.into();

// re-attach the 0x41 mainnet prefix
let back: tronz::Address = evm.into();
assert_eq!(tron, back);
```

This is what makes TRC20 ABI encoding work transparently — the address argument
is encoded as its 20-byte EVM body.
