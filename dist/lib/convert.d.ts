/**
 * The real work for the whole library are done in the main functions in this module.
 *
 * @module
 */
import { JWKKeyPair, MultikeyPair } from "./common";
/****************************************************************************************/
/****************************************************************************************/
/**
 * Generic function to convert a multikey pair to JWK. This function decodes the multikey data
 * into a binary buffer, checks the preambles and invokes the crypto curve specific converter functions
 * (depending on the preamble values) that do the final
 * conversion from the binary data to JWK.
 *
 * Works for ecdsa (both P-384 and P-256), and eddsa.
 *
 * @param keys
 * @returns
 * @throws - exceptions if something is incorrect in the incoming data
 */
export declare function multikeyToJWK(keys: MultikeyPair): JWKKeyPair;
/**
 * Convert JWK Key pair to Multikeys. This function decodes the JWK keys, finds out which binary key it encodes
 * and converts the key to the multikey versions depending on the exact curve.
 *
 * Note that the code does not check (yet?) all combination of the JWK pairs where they would be erroneous, only
 * those that would lead to error in this cose. E.g., it does not check whether the x (and possibly y) values
 * are identical in the secret and private JWK keys.
 *
 * Works for ecdsa (both P-384 and P-256), and eddsa.

 * @param keys
 */
export declare function JWKToMultikey(keys: JWKKeyPair): MultikeyPair;
