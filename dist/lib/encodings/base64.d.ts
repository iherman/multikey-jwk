/*************************************************************************************************/
/*************************************************************************************************/
/**
 * Convert an array buffer to base64url value.
 *
 * (Created with the help of chatgpt...)
 *
 * @param arrayBuffer
 * @returns
 */
export declare function encode(bytes: Uint8Array): string;
/**
 * Convert a base64url value to Uint8Array
 *
 * (Created with the help of chatgpt...)
 *
 * @param string
 * @returns
 */
export declare function decode(url: string): Uint8Array;
