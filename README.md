
--- NOT PRODUCTION READY ---

# Multikey <-> WebCrypto and JWK conversions


Conversion of cryptographic keys in [Multikey format](https://www.w3.org/TR/controller-document/#multikey) to and
from [WebCrypto](https://www.w3.org/TR/WebCryptoAPI/) and [JWK](https://datatracker.ietf.org/doc/html/rfc7517). The conversions are available for the three EC curves that are defined for Verifiable Credentials:
[ECDSA with P-256 and P-384](https://www.w3.org/TR/vc-di-ecdsa/#multikey) and [EDDSA](https://www.w3.org/TR/vc-di-eddsa/#multikey). 

This is really a proof-of-concept implementation. It shows that such conversion _can indeed be done_, 
which is an important in proving the practical usability of multikeys.

The package has been written in TypeScript+Node.js. (There is also a Deno version.)

For a more detailed documentation, see the [code documentation](https://iherman.github.io/multikey-webcrypto/), generated by typedoc.

[Examples to come]

