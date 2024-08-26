/**
 * Common types, conversion functions and Multikey conversion utilities for the rest of the code.
 * @module
 */
/**
 * Public/secret pair of JWK instances
 */
export interface JWKKeyPair {
    publicKey: JsonWebKey;
    privateKey?: JsonWebKey;
}
/**
 * Type for a Multibase
 *
 * One day this could become a string with a fixed regexp...
 */
export type Multibase = string;
/**
 * Pair of keys in Multibase encoding. Using the field names as defined in the
 * [Multikey specification](https://www.w3.org/TR/controller-document/#multikey).
 */
export interface Multikey {
    publicKeyMultibase: Multibase;
    secretKeyMultibase?: Multibase;
}
/**
 * Same as the Multikey, but decoded and without the preambles. I.e., just the bare key values.
 */
export interface MultikeyBinary {
    public: Uint8Array;
    secret?: Uint8Array;
}
/************************************************************************* */
/************************************************************************* */
/**
 * Names for the various crypto curves
 */
export declare enum CryptoCurves {
    ECDSA_384 = "secp384r1",
    ECDSA_256 = "secp256r1",
    EDDSA = "ed25519"
}
/**
 * Names for the key types
 */
export declare enum CryptoKeyTypes {
    PUBLIC = "public",
    SECRET = "secret"
}
/************************************* Preambles  ***************************/
/**
 * Type used for preambles, which are, so far, a single pair of numbers.
 */
export type Preamble<T> = [T, T];
/**
 * Each crypto class has two preambles, one for the public and one for the secret keys
 */
interface MultikeyPreambles {
    public: Preamble<number>;
    secret: Preamble<number>;
}
/**
 * Preamble value for EDDSA, a.k.a. `ed25519` curve
 */
export declare const EddsaPreambles: MultikeyPreambles;
/**
 * Preamble for ECDSA `P-256`, a.k.a. `secp256r1` curve
 */
export declare const Ecdsa256Preambles: MultikeyPreambles;
/**
 * Preamble for ECDSA `P-384`, a.k.a. `secp384r1` curve
 */
export declare const Ecdsa384Preambles: MultikeyPreambles;
/************************************ Converter tables **********************************/
/**
 * Type definition for the table mapping preambles to a specific curve.
 */
export type ClassToPreamble = {
    [key in CryptoCurves]: MultikeyPreambles;
};
/**
 * What preambles must be used for a Curve?
 */
export declare const classToPreamble: ClassToPreamble;
/**
 * Type definition for the table mapping curves to their decoder functions (i.e., mapping the Multikey to JWK).
 */
export type ClassToDecoder = {
    [key in CryptoCurves]: (curve: CryptoCurves, x: Uint8Array, d?: Uint8Array) => JWKKeyPair;
};
/**
 * What coder function must be used to convert from Multikey to JWK (data)?
 */
export declare const classToDecoder: ClassToDecoder;
/**
 * Type definition for the table mapping curves to their encoder functions (i.e., mapping the JWK to Multikey).
 */
export type ClassToEncoder = {
    [key in CryptoCurves]: (curve: CryptoCurves, x: Uint8Array, d: Uint8Array | undefined, _y?: Uint8Array) => MultikeyBinary;
};
/**
 * What coder function must be used to convert from JWK to Multikey?
 */
export declare const classToEncoder: ClassToEncoder;
/**
 * List of possible ECDSA Curves. Having this here declaratively may make it easier if
 * in the future, a new curve is added to the family (P-512)?
 */
export declare const ECDSACurves: CryptoCurves[];
/**
 * This is an internal type, used for the implementation: return the crypto curve and type from a multikey preamble.
 *
 * So far, I have not yet found a way to encode that in a simple table, hence the separate function.
 */
export interface CryptoKeyData {
    crCurve: CryptoCurves;
    crType: CryptoKeyTypes;
}
/**
 * Classify the crypto key based on the multikey preamble characters that are at the start of the code.
 * These are two binary numbers, signalling the crypto category (`ecdsa` or `eddsa`) and, in the former case,
 * the additional reference to the exact curve.
 *
 * @param preamble
 * @returns
 */
export declare function preambleToCryptoData(preamble: Preamble<number>): CryptoKeyData;
export {};
