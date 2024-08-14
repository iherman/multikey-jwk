/**
 * Base conversion functions for EDDSA. The functions are straightforward, but the interfaces are made so that
 * they coincide with the companion functions in ECDSA.
 *
 * @module
 */
import { JWKKeyPair, MultikeyPairBinary, CryptoCurves } from "./common";
/**
 * Convert the Crypto values from JWK to the equivalent Multikey Pairs' binary data.
 * The final encoding, with preambles, are done in the general level.
 *
 * For EDDSA, this is essentially, an empty function, which simply returns the `x` and `d` values. The
 * interface is there to be reused by the ECDSA equivalent, which must do some extra processing.
 *
 * @param _cl - unused in this function, just a placeholder
 * @param x - x value for the elliptical curve, as extracted from JWK
 * @param d - d (private) value for the elliptical curve, as extracted from JWK
 * @param _y - unused in this function, just a placeholder
 * @returns
 */
export declare function JWKToMultikeyBinary(_cl: CryptoCurves, x: Uint8Array, d: Uint8Array | undefined, _y?: Uint8Array): MultikeyPairBinary;
/**
 * Convert the multikey values to their JWK equivalents. The final `x` and `d` values are encoded
 * in base64 and then the relevant JWK structure are created
 *
 * For EDDSA, this is a very straightforward operation by just encoding the values and plugging them into a
 * constant JWK structure. The interface is there to be reused by the ECDSA equivalent, which must
 * do some extra processing.
 *
 * @param _cl - unused in this function, just a placeholder
 * @param xb - binary version of the x value for the elliptical curve
 * @param db - binary version of the d value for the elliptical curve
 * @returns
 */
export declare function multikeyBinaryToJWK(_cl: CryptoCurves, xb: Uint8Array, db?: Uint8Array): JWKKeyPair;
