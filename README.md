
--- NOT PRODUCTION READY ---

# Multikey ↔︎ WebCrypto and JWK conversions (Node.js version)


Conversion of cryptographic keys in [Multikey format](https://www.w3.org/TR/controller-document/#multikey) to and
from [WebCrypto](https://www.w3.org/TR/WebCryptoAPI/) and [JWK](https://datatracker.ietf.org/doc/html/rfc7517). The conversions are available for the three EC curves that are defined for Verifiable Credentials:
[ECDSA with P-256 and P-384](https://www.w3.org/TR/vc-di-ecdsa/#multikey) and [EDDSA](https://www.w3.org/TR/vc-di-eddsa/#multikey). 

(This is really a proof-of-concept implementation. It shows that such conversion _can indeed be done_, 
which is an important in proving the practical usability of multikeys. It would need extra tests using external Multikeys.)

The package has been written in TypeScript+Node.js. (There is also a [Typescript+Deno version](https://github.com/iherman/multikey-webcrypto-d).)

For a more detailed documentation, see the [code documentation](https://iherman.github.io/multikey-webcrypto/), generated by typedoc. A short set of examples may help.

## Necessary extra types used by the API

The interface makes use of the `JsonWebKey`, `CryptoKeyPair`, and `CryptoKey` types, which are global types in Node.js (or Deno), defined by WebCrypto. The following types are also exported by the package:

```typescript
export interface JWKKeyPair {
    publicKey: JsonWebKey;    
    privateKey?: JsonWebKey;
}

export type Multibase = string;

// The field names in `Multikey` reflect the Multikey specification.
export interface Multikey {
    publicKeyMultibase:  Multibase;
    secretKeyMultibase?: Multibase;
}
```

## Usage of the API functions

### Multikey and JWK

```typescript
import * as mkc from "multikey-webcrypto";

// Get a JWK pair
const jwk_pair: mkc.JWKKeyPair = {
    publicKey: your_jwk_public_key,
    privateKey: your_jwk_private_key,
};
const mk_pair: mkc.Multikey = mkc.JWKToMultikey(jwk_pair);
// mk_pair.publicKeyMultibase and mk_pair.secretKeyMultibase provide the converted values

// Convert the multikey back to jwk
const generated_jwk_pair: mkc.JWKKeyPair = mkc.multikeyToJWK(mk_pair);

```

In all cases the secret key may be missing or set to `undefined`, so that only the public key is converted. The same can be achieved if the functions are used with an overloaded signature:

```typescript
import * as mkc from "multikey-webcrypto";

const mk: mkc.Multibase = mkc.JWKToMultikey(your_jwk_public_key);
// mk the encoded value

// Convert the multikey back to jwk
const generated_jwk_public_key: mkc.JWKKeyPair = mkc.multikeyToJWK(mk);
```

### Multikey and WebCrypto keys

The interface is similar to the JWK case. The only major difference is that functions are asynchronous (the reason is that WebCrypto implementations are asynchronous). 
The simplest approach is to use the `await` constructs in the code: 

```typescript
import * as mkc from "multikey-webcrypto";

// Convert a JWK Pair to a Multikey.
// Note: the `CryptoKeyPair` interface is defined by the WebCrypto implementations, not by this package
const crypto_pair: CryptoKeyPair = {
    publicKey: your_web_crypto_public_key,
    privateKey: your_web_crypto_secret_key,
};
const mk_pair: Multikey = await mkc.cryptoToMultikey(crypto_pair);
// mk_pair.publicKeyMultibase and mk_pair.secretKeyMultibase provide the right values

// Convert the multikey back to jwk
const generated_crypto_pair: mkc.JWKKeyPair = await mkc.multikeyToCrypto(mk_pair);
```

Similarly to the JWK case, handling public keys only can be done with the aliased versions of the same functions:

```typescript
import * as mkc from "multikey-webcrypto";

const mk: Multibase = mkc.cryptoToMultikey(your_web_crypto_public_key);
// mk the encoded value

// Convert the multikey back to jwk
const generated_crypto_key: JWKKeyPair = mkc.multikeyToJWK(mk);
```
