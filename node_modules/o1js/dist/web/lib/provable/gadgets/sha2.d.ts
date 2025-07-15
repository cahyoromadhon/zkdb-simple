import { UInt32, UInt64 } from '../int.js';
import { FlexibleBytes } from '../bytes.js';
import { Bytes } from '../wrapped-classes.js';
export { SHA2 };
type Length = 224 | 256 | 384 | 512;
declare const SHA2: {
    /**
     * Implementation of [NIST SHA-2](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
     * hash Function. Supports output lengths of 224, 256, 384, or 512 bits.
     *
     * Applies the SHA-2 hash function to a list of big-endian byte-sized {@link Field}
     * elements, flexible to handle varying output lengths (224, 256, 384, 512 bits) as specified.
     *
     * The function accepts {@link Bytes} as the input message, which is a type that
     * represents a static-length list of byte-sized field elements (range-checked
     * using {@link Gadgets.rangeCheck8}).
     * Alternatively, you can pass plain `number[]` of `Uint8Array` to perform a hash
     * outside provable code.
     *
     * Produces an output of {@link Bytes} that conforms to the chosen bit length.
     * Both input and output bytes are big-endian.
     *
     * @param len - Desired output length in bits. Valid options: 224, 256, 384, 512.
     * @param message - Big-endian {@link Bytes} representing the message to hash.
     *
     * ```ts
     * let preimage = Bytes.fromString("hello world");
     * let digest224 = SHA2.hash(224, preimage);
     * let digest256 = SHA2.hash(256, preimage);
     * let digest384 = SHA2.hash(384, preimage);
     * let digest512 = SHA2.hash(512, preimage);
     * ```
     *
     */
    hash<T extends Length>(length: T, data: FlexibleBytes): Bytes;
    compression: typeof compression;
    messageSchedule: typeof messageSchedule;
    padding: typeof padding;
    initialState<T_1 extends UInt64 | UInt32>(length: Length): T_1[];
};
/**
 * Padding function for SHA2, as specified in §5.1.1, §5.1.2,
 *
 * @param data  The message to hash
 * @param length Whether this is a SHA2-224 or SHA2-256 or SHA2-384 or SHA2-512
 * @returns
 */
declare function padding<T extends UInt32 | UInt64>(length: Length, data: FlexibleBytes): T[][];
/**
 * Prepares the message schedule for the SHA2 compression function from the given message block.
 *
 * @param length Whether this is a SHA2-224 or SHA2-256 or SHA2-384 or SHA2-512
 * @param M - The 512-bit message block (16-element array of UInt32)
 *            or the 1024-bit message block (16-element array of UInt64).
 * @returns The message schedule (64-element array of UInt32 or 80-element array of UInt64).
 */
declare function messageSchedule<T extends UInt32 | UInt64>(length: Length, M: T[]): T[];
/**
 * Performs the SHA-2 compression function on the given hash values and message schedule.
 *
 * @param length Whether this is a SHA2-224 or SHA2-256 or SHA2-384 or SHA2-512
 * @param H - The initial or intermediate hash values (8-element array of T).
 * @param W - The message schedule (64-element array of T).
 *
 * @returns The updated intermediate hash values after compression.
 */
declare function compression<T extends UInt32 | UInt64>(length: Length, [...H]: T[], W: T[]): T[];
