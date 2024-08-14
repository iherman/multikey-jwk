export interface JWKKeyPair {
    public: JsonWebKey;
    secret?: JsonWebKey;
}
/**
 * Typeguard for JWK Key Pair.
 * It is not really elaborate, it only tries to differentiate between a JWK Single Key and a Key Pair.
 *
 * @param obj
 * @returns is it a JWKKeyPair?
 */
export declare function isJWKKeyPair(obj: any): obj is JWKKeyPair;
/**
 * Type for a Multikey
 *
 * One day this could become a string with a fixed regexp...
 */
export type Multikey = string;
/**
 * The specification is a bit fuzzy and talks about Multikey for a pair, and for individual constituents.
 * We need to differentiate those two...
 */
export interface MultikeyPair {
    publicKeyMultibase: Multikey;
    secretKeyMultibase?: Multikey;
}
/**
 * Typeguard for a Multikey Pair.
 * It is not really elaborate, it only tries to differentiate between a single Multikey and a Key Pair.
 *
 * @param obj
 * @returns is it a MultikeyPair?
 */
export declare function isMultikeyPair(obj: any): obj is MultikeyPair;
/**
 * Same as the Multikey Pair, but decoded and without the preambles. Just the bare key values.
 */
export interface MultikeyPairBinary {
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
 * Each crypto class has two preamble, on for the public and one for the secret keys
 */
interface MultikeyPreambles {
    public: Preamble<number>;
    secret: Preamble<number>;
}
/**
 * Preamble value for ECDSA, a.k.a. ed25519 curve
 */
export declare const EddsaPreambles: MultikeyPreambles;
/**
 * Preamble for ECDSA P-256, a.k.a. secp256r1 curve
 */
export declare const Ecdsa256Preambles: MultikeyPreambles;
/**
 * Preamble for ECDSA P-256, a.k.a. secp384r1 curve
 */
export declare const Ecdsa384Preambles: MultikeyPreambles;
/************************************ Converter tables **********************************/
/**
 * What preambles must be used for a Curve (mapping type?
 */
export type ClassToPreamble = {
    [key in CryptoCurves]: MultikeyPreambles;
};
/**
 * What preambles must be used for a Curve (data)?
 */
export declare const classToPreamble: ClassToPreamble;
/**
 * What coder function must be used to convert from Multikey to JWK (type)?
 */
export type ClassToDecoder = {
    [key in CryptoCurves]: (keyCurve: CryptoCurves, x: Uint8Array, d?: Uint8Array) => JWKKeyPair;
};
/**
 * hat coder function must be used to convert from Multikey to JWK (data)?
 */
export declare const classToDecoder: ClassToDecoder;
/**
 * What coder function must be used to convert from JWK to Multikey (type)?
 */
export type ClassToEncoder = {
    [key in CryptoCurves]: (keyCurve: CryptoCurves, x: Uint8Array, d: Uint8Array | undefined, _y?: Uint8Array) => MultikeyPairBinary;
};
/**
 * What coder function must be used to convert from JWK to Multikey (data)?
 */
export declare const classToEncoder: ClassToEncoder;
/**
 * List of possible ECDSA Curves. Having this here declaratively may make it easier if
 * in the future, a new curve is added to the family (P-512)?
 */
export declare const ECDSACurves: CryptoCurves[];
/**
 * This is an internal type, used for the implementation: return the crypto curve and type from a preamble.
 *
 * So far, I have not yet found a way to encode that in a simple table, hence the separate function.
 */
export interface CryptoKeyData {
    crCurve: CryptoCurves;
    crType: CryptoKeyTypes;
}
/**
 * Classify the crypto key based on the multikey preamble characters that are at the start of the code.
 * These are two binary numbers, signalling the crypto class (ecdsa or eddsa) and, in the former case,
 * the hash function.
 *
 * @param preamble
 * @returns
 */
export declare function preambleToCryptoData(preamble: Preamble<number>): CryptoKeyData;
export {};
