/**
 * Conversion to and from [Multikey format](https://www.w3.org/TR/controller-document/#multikey) from
 * JWK for the three EC curves that are defined for Verifiable Credentials: [ECDSA with P-256 and P-384](https://www.w3.org/TR/vc-di-ecdsa/#multikey)
 * and [EDDSA](https://www.w3.org/TR/vc-di-eddsa/#multikey).
 *
 * @package
 */
import { JWKKeyPair, MultikeyPair, Multikey } from './lib/common';
export type { JWKKeyPair, MultikeyPair, Multikey } from './lib/common';
/**
 * Generic function to convert a multikey pair to JWK. This function decodes the multikey data
 * into a binary buffer, checks the preambles and invokes the crypto specific converter functions
 * (depending on the preamble values) that do the final
 * conversion from the binary data to JWK.
 *
 * Works for ecdsa (both P-384 and P-256), and eddsa.
 *
 * @param keys
 * @throws - exceptions if something is incorrect in the incoming data
 */
export declare function multikeyToJWK(keys: Multikey): JsonWebKey;
export declare function multikeyToJWK(keys: MultikeyPair): JWKKeyPair;
/**
 * Convert JWK Key pair to Multikeys. This function decodes the JWK keys, finds out which binary key it encodes
 * and converts the key to the multikey versions depending on the exact curve.
 *
 * Note that the code does not check (yet?) all combination of the JWK pairs and fields for possible errors, only
 * those that would lead to error in this package. E.g., it does not check whether the x (and possibly y) values
 * are identical in the secret and private JWK keys.
 *
 * Works for ecdsa (both P-384 and P-256), and eddsa.
 *
 * @param keys
 * @throws - exceptions if something is incorrect in the incoming data
 */
export declare function JWKToMultikey(keys: JsonWebKey): Multikey;
export declare function JWKToMultikey(keys: JWKKeyPair): MultikeyPair;
