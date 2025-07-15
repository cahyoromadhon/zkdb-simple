import { Bool } from './bool.js';
import { Field } from './field.js';
import { ProvablePureExtended } from './types/struct.js';
import { Unconstrained } from './types/unconstrained.js';
export { createProvableBigInt, ProvableBigInt };
type BigIntParameter = {
    limbNum: number;
    limbSize: number;
    mask: bigint;
    max: bigint;
};
/**
 * Creates a class representing a ProvableBigInt with modular arithmetic capabilities.
 * This is particularly useful for implementing prime fields that don't fit into the native field.
 *
 * ```ts
 * const BigInt521 = createProvableBigInt(2n ** 521n - 1n); // creates a class for 521-bit integers
 * ```
 *
 * `createProvableBigInt(modulus, config?)` takes two parameters:
 * - `modulus`: The modulus of the field (must be a prime)
 * - `config`: Optional configuration for custom limb size and numbers
 *
 * The returned class supports comprehensive arithmetic operations including:
 * - Basic operations: addition, double, subtraction, multiplication, square, division
 * - Advanced operations: inverse, negate, sqrt, power
 * - Comparison operations: equals, assertEquals, greaterThan, lessthan, greaterThanOrEqual, lessThanOrEqual
 * - Conversion methods: fromBigInt, toBigInt, fromFields, toFields, fromBits, toBits
 *
 * Implementation details:
 *
 * Internally, a ProvableBigInt is represented as an array of Field elements (limbs),
 * where each limb holds 116 bits as default. The total size is determined by the configuration,
 * with preset options supporting different bit lengths:
 * - 348 bits (3 limbs)
 * - 464 bits (4 limbs)
 * - 580 bits (5 limbs)
 * - 1044 bits (9 limbs)
 * - 2088 bits (18 limbs)
 * - 4176 bits (36 limbs)
 *
 * Each arithmetic operation ensures the result is a valid element of the prime field.
 *
 * @example
 * ```ts
 * // Create a Provable BigInt class with modulus 2^521 - 1
 * const BigInt521 = createProvableBigInt(2n ** 521n - 1n);
 *
 * // Create instances
 * const a = BigInt521.fromBigInt(123n);
 * const b = BigInt521.fromBigInt(456n);
 * const c = BigInt521.fromBigInt(1024n);
 *
 * // Perform operations
 * const sum = a.add(b);
 * const double = a.double();
 * const diff = a.sub(b);
 * const product = a.mul(b);
 * const square = a.square();
 * const quotient = a.div(b);
 * const inverse = a.inverse();
 * const negation = a.negate();
 * const power = a.pow(b);
 * const sqrt = c.sqrt();
 * ```
 *
 * The class automatically handles modular reduction after
 * arithmetic operations to maintain valid representations. All operations are
 * designed to be provable and optimised for less constraints.
 *
 * @param modulus The modulus for the big integer arithmetic (must be prime)
 * @param config Optional configuration specifying a custom limb size and number
 * @returns A class representing ProvableBigInts with the specified modulus
 * @throws If the modulus is zero, negative, or exceeds the maximum supported size
 */
declare function createProvableBigInt(modulus: bigint, config?: BigIntParameter): {
    new (fields: Field[], value: Unconstrained<bigint>): {
        readonly Constructor: typeof ProvableBigInt;
        /**
         * Converts a ProvableBigInt instance to a JS bigint
         * @returns JS bigint representation of the ProvableBigInt
         */
        toBigInt(): bigint;
        /**
         * Converts a ProvableBigInt instance to field array representation of the limbs
         * @returns Limbs of the ProvableBigInt
         */
        toFields(): Field[];
        /**
         * Converts a ProvableBigInt instance to an array of bits
         * @returns An array of bits representing the ProvableBigInt
         */
        toBits(): Bool[];
        /**
         * Clones a ProvableBigInt instance
         * @returns A new ProvableBigInt instance with the same value
         */
        clone(): any;
        /**
         * Adds two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to add
         * @returns The sum as a ProvableBigInt
         */
        add(a: any, isDouble?: boolean): any;
        /**
         * Doubles a ProvableBigInt
         * Cost: Cheap
         * @returns The double of a ProvableBigInt
         */
        double(): any;
        /**
         * Subtracts one ProvableBigInt from another
         * Cost: Cheap
         * @param a The ProvableBigInt to subtract
         * @returns The difference as a ProvableBigInt
         */
        sub(a: any): any;
        /**
         * Multiplies two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to multiply
         * @returns The product as a ProvableBigInt
         */
        mul(a: any, isSquare?: boolean): any;
        /**
         * Computes the square root of a ProvableBigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        square(): any;
        /**
         * Divides one ProvableBigInt by another.
         * Cost: Cheap-Moderate
         * @param a The divisor as a ProvableBigInt
         * @returns The quotient as ProvableBigInt
         */
        div(a: any): any;
        /**
         * Computes the modular inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The inverse as a ProvableBigInt
         */
        inverse(): any;
        /**
         * Computes the additive inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The additive inverse as a ProvableBigInt
         */
        negate(): any;
        /**
         * Computes the power of a ProvableBigInt raised to an exponent
         * Cost: Expensive
         * @param exp The exponent
         * @returns The result as a ProvableBigInt
         */
        pow(exp: any): any;
        /**
         * Computes the square root of a Provable BigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        sqrt(): any;
        /**
         * Checks if one ProvableBigInt is greater than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than b
         *
         * TODO: Comparators should ensure than inputs are canonical fields (value < p).
         *       e.g.
         *       ```ts
         *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
         *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
         *       ```
         *
         */
        greaterThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is greater than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than or equal to b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        greaterThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        lessThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        lessThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        equals(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        assertEquals(a: any): void;
        fields: Field[];
        value: Unconstrained<bigint>;
    };
    /**
     * Returns a ProvableBigInt representing zero
     * @returns A ProvableBigInt representing zero
     */
    zero(): {
        readonly Constructor: typeof ProvableBigInt;
        /**
         * Converts a ProvableBigInt instance to a JS bigint
         * @returns JS bigint representation of the ProvableBigInt
         */
        toBigInt(): bigint;
        /**
         * Converts a ProvableBigInt instance to field array representation of the limbs
         * @returns Limbs of the ProvableBigInt
         */
        toFields(): Field[];
        /**
         * Converts a ProvableBigInt instance to an array of bits
         * @returns An array of bits representing the ProvableBigInt
         */
        toBits(): Bool[];
        /**
         * Clones a ProvableBigInt instance
         * @returns A new ProvableBigInt instance with the same value
         */
        clone(): any;
        /**
         * Adds two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to add
         * @returns The sum as a ProvableBigInt
         */
        add(a: any, isDouble?: boolean): any;
        /**
         * Doubles a ProvableBigInt
         * Cost: Cheap
         * @returns The double of a ProvableBigInt
         */
        double(): any;
        /**
         * Subtracts one ProvableBigInt from another
         * Cost: Cheap
         * @param a The ProvableBigInt to subtract
         * @returns The difference as a ProvableBigInt
         */
        sub(a: any): any;
        /**
         * Multiplies two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to multiply
         * @returns The product as a ProvableBigInt
         */
        mul(a: any, isSquare?: boolean): any;
        /**
         * Computes the square root of a ProvableBigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        square(): any;
        /**
         * Divides one ProvableBigInt by another.
         * Cost: Cheap-Moderate
         * @param a The divisor as a ProvableBigInt
         * @returns The quotient as ProvableBigInt
         */
        div(a: any): any;
        /**
         * Computes the modular inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The inverse as a ProvableBigInt
         */
        inverse(): any;
        /**
         * Computes the additive inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The additive inverse as a ProvableBigInt
         */
        negate(): any;
        /**
         * Computes the power of a ProvableBigInt raised to an exponent
         * Cost: Expensive
         * @param exp The exponent
         * @returns The result as a ProvableBigInt
         */
        pow(exp: any): any;
        /**
         * Computes the square root of a Provable BigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        sqrt(): any;
        /**
         * Checks if one ProvableBigInt is greater than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than b
         *
         * TODO: Comparators should ensure than inputs are canonical fields (value < p).
         *       e.g.
         *       ```ts
         *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
         *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
         *       ```
         *
         */
        greaterThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is greater than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than or equal to b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        greaterThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        lessThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        lessThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        equals(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        assertEquals(a: any): void;
        fields: Field[];
        value: Unconstrained<bigint>;
    };
    /**
     * Returns a ProvableBigInt representing one
     * @returns A ProvableBigInt representing one
     */
    one(): {
        readonly Constructor: typeof ProvableBigInt;
        /**
         * Converts a ProvableBigInt instance to a JS bigint
         * @returns JS bigint representation of the ProvableBigInt
         */
        toBigInt(): bigint;
        /**
         * Converts a ProvableBigInt instance to field array representation of the limbs
         * @returns Limbs of the ProvableBigInt
         */
        toFields(): Field[];
        /**
         * Converts a ProvableBigInt instance to an array of bits
         * @returns An array of bits representing the ProvableBigInt
         */
        toBits(): Bool[];
        /**
         * Clones a ProvableBigInt instance
         * @returns A new ProvableBigInt instance with the same value
         */
        clone(): any;
        /**
         * Adds two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to add
         * @returns The sum as a ProvableBigInt
         */
        add(a: any, isDouble?: boolean): any;
        /**
         * Doubles a ProvableBigInt
         * Cost: Cheap
         * @returns The double of a ProvableBigInt
         */
        double(): any;
        /**
         * Subtracts one ProvableBigInt from another
         * Cost: Cheap
         * @param a The ProvableBigInt to subtract
         * @returns The difference as a ProvableBigInt
         */
        sub(a: any): any;
        /**
         * Multiplies two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to multiply
         * @returns The product as a ProvableBigInt
         */
        mul(a: any, isSquare?: boolean): any;
        /**
         * Computes the square root of a ProvableBigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        square(): any;
        /**
         * Divides one ProvableBigInt by another.
         * Cost: Cheap-Moderate
         * @param a The divisor as a ProvableBigInt
         * @returns The quotient as ProvableBigInt
         */
        div(a: any): any;
        /**
         * Computes the modular inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The inverse as a ProvableBigInt
         */
        inverse(): any;
        /**
         * Computes the additive inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The additive inverse as a ProvableBigInt
         */
        negate(): any;
        /**
         * Computes the power of a ProvableBigInt raised to an exponent
         * Cost: Expensive
         * @param exp The exponent
         * @returns The result as a ProvableBigInt
         */
        pow(exp: any): any;
        /**
         * Computes the square root of a Provable BigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        sqrt(): any;
        /**
         * Checks if one ProvableBigInt is greater than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than b
         *
         * TODO: Comparators should ensure than inputs are canonical fields (value < p).
         *       e.g.
         *       ```ts
         *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
         *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
         *       ```
         *
         */
        greaterThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is greater than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than or equal to b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        greaterThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        lessThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        lessThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        equals(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        assertEquals(a: any): void;
        fields: Field[];
        value: Unconstrained<bigint>;
    };
    /**
     * Returns a ProvableBigInt representing one
     * @returns A ProvableBigInt representing one
     */
    max(): {
        readonly Constructor: typeof ProvableBigInt;
        /**
         * Converts a ProvableBigInt instance to a JS bigint
         * @returns JS bigint representation of the ProvableBigInt
         */
        toBigInt(): bigint;
        /**
         * Converts a ProvableBigInt instance to field array representation of the limbs
         * @returns Limbs of the ProvableBigInt
         */
        toFields(): Field[];
        /**
         * Converts a ProvableBigInt instance to an array of bits
         * @returns An array of bits representing the ProvableBigInt
         */
        toBits(): Bool[];
        /**
         * Clones a ProvableBigInt instance
         * @returns A new ProvableBigInt instance with the same value
         */
        clone(): any;
        /**
         * Adds two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to add
         * @returns The sum as a ProvableBigInt
         */
        add(a: any, isDouble?: boolean): any;
        /**
         * Doubles a ProvableBigInt
         * Cost: Cheap
         * @returns The double of a ProvableBigInt
         */
        double(): any;
        /**
         * Subtracts one ProvableBigInt from another
         * Cost: Cheap
         * @param a The ProvableBigInt to subtract
         * @returns The difference as a ProvableBigInt
         */
        sub(a: any): any;
        /**
         * Multiplies two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to multiply
         * @returns The product as a ProvableBigInt
         */
        mul(a: any, isSquare?: boolean): any;
        /**
         * Computes the square root of a ProvableBigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        square(): any;
        /**
         * Divides one ProvableBigInt by another.
         * Cost: Cheap-Moderate
         * @param a The divisor as a ProvableBigInt
         * @returns The quotient as ProvableBigInt
         */
        div(a: any): any;
        /**
         * Computes the modular inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The inverse as a ProvableBigInt
         */
        inverse(): any;
        /**
         * Computes the additive inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The additive inverse as a ProvableBigInt
         */
        negate(): any;
        /**
         * Computes the power of a ProvableBigInt raised to an exponent
         * Cost: Expensive
         * @param exp The exponent
         * @returns The result as a ProvableBigInt
         */
        pow(exp: any): any;
        /**
         * Computes the square root of a Provable BigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        sqrt(): any;
        /**
         * Checks if one ProvableBigInt is greater than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than b
         *
         * TODO: Comparators should ensure than inputs are canonical fields (value < p).
         *       e.g.
         *       ```ts
         *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
         *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
         *       ```
         *
         */
        greaterThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is greater than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than or equal to b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        greaterThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        lessThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        lessThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        equals(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        assertEquals(a: any): void;
        fields: Field[];
        value: Unconstrained<bigint>;
    };
    /**
     * Creates a ProvableBigInt instance from a JS bigint, string, number, or boolean
     * @param x
     * @returns ProvableBigInt instance from the input
     */
    from(x: bigint | string | number | boolean): {
        readonly Constructor: typeof ProvableBigInt;
        /**
         * Converts a ProvableBigInt instance to a JS bigint
         * @returns JS bigint representation of the ProvableBigInt
         */
        toBigInt(): bigint;
        /**
         * Converts a ProvableBigInt instance to field array representation of the limbs
         * @returns Limbs of the ProvableBigInt
         */
        toFields(): Field[];
        /**
         * Converts a ProvableBigInt instance to an array of bits
         * @returns An array of bits representing the ProvableBigInt
         */
        toBits(): Bool[];
        /**
         * Clones a ProvableBigInt instance
         * @returns A new ProvableBigInt instance with the same value
         */
        clone(): any;
        /**
         * Adds two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to add
         * @returns The sum as a ProvableBigInt
         */
        add(a: any, isDouble?: boolean): any;
        /**
         * Doubles a ProvableBigInt
         * Cost: Cheap
         * @returns The double of a ProvableBigInt
         */
        double(): any;
        /**
         * Subtracts one ProvableBigInt from another
         * Cost: Cheap
         * @param a The ProvableBigInt to subtract
         * @returns The difference as a ProvableBigInt
         */
        sub(a: any): any;
        /**
         * Multiplies two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to multiply
         * @returns The product as a ProvableBigInt
         */
        mul(a: any, isSquare?: boolean): any;
        /**
         * Computes the square root of a ProvableBigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        square(): any;
        /**
         * Divides one ProvableBigInt by another.
         * Cost: Cheap-Moderate
         * @param a The divisor as a ProvableBigInt
         * @returns The quotient as ProvableBigInt
         */
        div(a: any): any;
        /**
         * Computes the modular inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The inverse as a ProvableBigInt
         */
        inverse(): any;
        /**
         * Computes the additive inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The additive inverse as a ProvableBigInt
         */
        negate(): any;
        /**
         * Computes the power of a ProvableBigInt raised to an exponent
         * Cost: Expensive
         * @param exp The exponent
         * @returns The result as a ProvableBigInt
         */
        pow(exp: any): any;
        /**
         * Computes the square root of a Provable BigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        sqrt(): any;
        /**
         * Checks if one ProvableBigInt is greater than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than b
         *
         * TODO: Comparators should ensure than inputs are canonical fields (value < p).
         *       e.g.
         *       ```ts
         *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
         *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
         *       ```
         *
         */
        greaterThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is greater than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than or equal to b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        greaterThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        lessThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        lessThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        equals(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        assertEquals(a: any): void;
        fields: Field[];
        value: Unconstrained<bigint>;
    };
    /**
     * Creates a ProvableBigInt instance from a JS bigint
     * @param x
     * @returns ProvableBigInt instance from the input
     */
    fromBigInt(x: bigint): {
        readonly Constructor: typeof ProvableBigInt;
        /**
         * Converts a ProvableBigInt instance to a JS bigint
         * @returns JS bigint representation of the ProvableBigInt
         */
        toBigInt(): bigint;
        /**
         * Converts a ProvableBigInt instance to field array representation of the limbs
         * @returns Limbs of the ProvableBigInt
         */
        toFields(): Field[];
        /**
         * Converts a ProvableBigInt instance to an array of bits
         * @returns An array of bits representing the ProvableBigInt
         */
        toBits(): Bool[];
        /**
         * Clones a ProvableBigInt instance
         * @returns A new ProvableBigInt instance with the same value
         */
        clone(): any;
        /**
         * Adds two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to add
         * @returns The sum as a ProvableBigInt
         */
        add(a: any, isDouble?: boolean): any;
        /**
         * Doubles a ProvableBigInt
         * Cost: Cheap
         * @returns The double of a ProvableBigInt
         */
        double(): any;
        /**
         * Subtracts one ProvableBigInt from another
         * Cost: Cheap
         * @param a The ProvableBigInt to subtract
         * @returns The difference as a ProvableBigInt
         */
        sub(a: any): any;
        /**
         * Multiplies two ProvableBigInt instances
         * Cost: Cheap
         * @param a The ProvableBigInt to multiply
         * @returns The product as a ProvableBigInt
         */
        mul(a: any, isSquare?: boolean): any;
        /**
         * Computes the square root of a ProvableBigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        square(): any;
        /**
         * Divides one ProvableBigInt by another.
         * Cost: Cheap-Moderate
         * @param a The divisor as a ProvableBigInt
         * @returns The quotient as ProvableBigInt
         */
        div(a: any): any;
        /**
         * Computes the modular inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The inverse as a ProvableBigInt
         */
        inverse(): any;
        /**
         * Computes the additive inverse of a ProvableBigInt
         * Cost: Cheap
         * @returns The additive inverse as a ProvableBigInt
         */
        negate(): any;
        /**
         * Computes the power of a ProvableBigInt raised to an exponent
         * Cost: Expensive
         * @param exp The exponent
         * @returns The result as a ProvableBigInt
         */
        pow(exp: any): any;
        /**
         * Computes the square root of a Provable BigInt
         * Cost: Cheap
         * @returns The square root as a ProvableBigInt
         */
        sqrt(): any;
        /**
         * Checks if one ProvableBigInt is greater than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than b
         *
         * TODO: Comparators should ensure than inputs are canonical fields (value < p).
         *       e.g.
         *       ```ts
         *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
         *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
         *       ```
         *
         */
        greaterThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is greater than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is greater than or equal to b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        greaterThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than b
         *
         * TODO: @see {@link greaterThan}
         *
         */
        lessThan(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Moderate
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        lessThanOrEqual(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        equals(a: any): Bool;
        /**
         * Checks if one ProvableBigInt is less than or equal to another
         * Cost: Cheap
         * @param a The ProvableBigInt to compare
         * @returns A Bool indicating if a is less than or equal to b
         *
         * TODO: @see {@link greaterThan}
         */
        assertEquals(a: any): void;
        fields: Field[];
        value: Unconstrained<bigint>;
    };
    Unsafe: {
        /**
         * Creates a ProvableBigInt instance from an limbs as an array of fields
         * **WARNING**: This method is UNSAFE and lacks checks on the fields. Use with caution as it can lead to incorrect results or security vulnerabilities.
         * @param fields The limbs of the ProvableBigInt. Must be of the correct length.
         * @returns A ProvableBigInt instance from the fields
         */
        fromFields(fields: Field[]): {
            readonly Constructor: typeof ProvableBigInt;
            /**
             * Converts a ProvableBigInt instance to a JS bigint
             * @returns JS bigint representation of the ProvableBigInt
             */
            toBigInt(): bigint;
            /**
             * Converts a ProvableBigInt instance to field array representation of the limbs
             * @returns Limbs of the ProvableBigInt
             */
            toFields(): Field[];
            /**
             * Converts a ProvableBigInt instance to an array of bits
             * @returns An array of bits representing the ProvableBigInt
             */
            toBits(): Bool[];
            /**
             * Clones a ProvableBigInt instance
             * @returns A new ProvableBigInt instance with the same value
             */
            clone(): any;
            /**
             * Adds two ProvableBigInt instances
             * Cost: Cheap
             * @param a The ProvableBigInt to add
             * @returns The sum as a ProvableBigInt
             */
            add(a: any, isDouble?: boolean): any;
            /**
             * Doubles a ProvableBigInt
             * Cost: Cheap
             * @returns The double of a ProvableBigInt
             */
            double(): any;
            /**
             * Subtracts one ProvableBigInt from another
             * Cost: Cheap
             * @param a The ProvableBigInt to subtract
             * @returns The difference as a ProvableBigInt
             */
            sub(a: any): any;
            /**
             * Multiplies two ProvableBigInt instances
             * Cost: Cheap
             * @param a The ProvableBigInt to multiply
             * @returns The product as a ProvableBigInt
             */
            mul(a: any, isSquare?: boolean): any;
            /**
             * Computes the square root of a ProvableBigInt
             * Cost: Cheap
             * @returns The square root as a ProvableBigInt
             */
            square(): any;
            /**
             * Divides one ProvableBigInt by another.
             * Cost: Cheap-Moderate
             * @param a The divisor as a ProvableBigInt
             * @returns The quotient as ProvableBigInt
             */
            div(a: any): any;
            /**
             * Computes the modular inverse of a ProvableBigInt
             * Cost: Cheap
             * @returns The inverse as a ProvableBigInt
             */
            inverse(): any;
            /**
             * Computes the additive inverse of a ProvableBigInt
             * Cost: Cheap
             * @returns The additive inverse as a ProvableBigInt
             */
            negate(): any;
            /**
             * Computes the power of a ProvableBigInt raised to an exponent
             * Cost: Expensive
             * @param exp The exponent
             * @returns The result as a ProvableBigInt
             */
            pow(exp: any): any;
            /**
             * Computes the square root of a Provable BigInt
             * Cost: Cheap
             * @returns The square root as a ProvableBigInt
             */
            sqrt(): any;
            /**
             * Checks if one ProvableBigInt is greater than another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is greater than b
             *
             * TODO: Comparators should ensure than inputs are canonical fields (value < p).
             *       e.g.
             *       ```ts
             *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
             *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
             *       ```
             *
             */
            greaterThan(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is greater than or equal to another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is greater than or equal to b
             *
             * TODO: @see {@link greaterThan}
             *
             */
            greaterThanOrEqual(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is less than another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is less than b
             *
             * TODO: @see {@link greaterThan}
             *
             */
            lessThan(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is less than or equal to another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is less than or equal to b
             *
             * TODO: @see {@link greaterThan}
             */
            lessThanOrEqual(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is equal to another
             * Cost: Cheap
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is equal to b
             *
             * TODO: @see {@link greaterThan}
             */
            equals(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is less than or equal to another
             * Cost: Cheap
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is less than or equal to b
             *
             * TODO: @see {@link greaterThan}
             */
            assertEquals(a: any): void;
            fields: Field[];
            value: Unconstrained<bigint>;
        };
        /**
         * Creates a ProvableBigInt instance from an array of bits
         * **WARNING**: This method is UNSAFE and lacks checks on the bits. Use with caution as it can lead to incorrect results or security vulnerabilities.
         * @param bits
         * @returns A ProvableBigInt instance from the bits
         */
        fromBits(bits: Bool[]): {
            readonly Constructor: typeof ProvableBigInt;
            /**
             * Converts a ProvableBigInt instance to a JS bigint
             * @returns JS bigint representation of the ProvableBigInt
             */
            toBigInt(): bigint;
            /**
             * Converts a ProvableBigInt instance to field array representation of the limbs
             * @returns Limbs of the ProvableBigInt
             */
            toFields(): Field[];
            /**
             * Converts a ProvableBigInt instance to an array of bits
             * @returns An array of bits representing the ProvableBigInt
             */
            toBits(): Bool[];
            /**
             * Clones a ProvableBigInt instance
             * @returns A new ProvableBigInt instance with the same value
             */
            clone(): any;
            /**
             * Adds two ProvableBigInt instances
             * Cost: Cheap
             * @param a The ProvableBigInt to add
             * @returns The sum as a ProvableBigInt
             */
            add(a: any, isDouble?: boolean): any;
            /**
             * Doubles a ProvableBigInt
             * Cost: Cheap
             * @returns The double of a ProvableBigInt
             */
            double(): any;
            /**
             * Subtracts one ProvableBigInt from another
             * Cost: Cheap
             * @param a The ProvableBigInt to subtract
             * @returns The difference as a ProvableBigInt
             */
            sub(a: any): any;
            /**
             * Multiplies two ProvableBigInt instances
             * Cost: Cheap
             * @param a The ProvableBigInt to multiply
             * @returns The product as a ProvableBigInt
             */
            mul(a: any, isSquare?: boolean): any;
            /**
             * Computes the square root of a ProvableBigInt
             * Cost: Cheap
             * @returns The square root as a ProvableBigInt
             */
            square(): any;
            /**
             * Divides one ProvableBigInt by another.
             * Cost: Cheap-Moderate
             * @param a The divisor as a ProvableBigInt
             * @returns The quotient as ProvableBigInt
             */
            div(a: any): any;
            /**
             * Computes the modular inverse of a ProvableBigInt
             * Cost: Cheap
             * @returns The inverse as a ProvableBigInt
             */
            inverse(): any;
            /**
             * Computes the additive inverse of a ProvableBigInt
             * Cost: Cheap
             * @returns The additive inverse as a ProvableBigInt
             */
            negate(): any;
            /**
             * Computes the power of a ProvableBigInt raised to an exponent
             * Cost: Expensive
             * @param exp The exponent
             * @returns The result as a ProvableBigInt
             */
            pow(exp: any): any;
            /**
             * Computes the square root of a Provable BigInt
             * Cost: Cheap
             * @returns The square root as a ProvableBigInt
             */
            sqrt(): any;
            /**
             * Checks if one ProvableBigInt is greater than another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is greater than b
             *
             * TODO: Comparators should ensure than inputs are canonical fields (value < p).
             *       e.g.
             *       ```ts
             *       let delta = x.sub(x); // not guaranteed to be < p, could be = p
             *       delta.greaterThan(ProvableBigInt.zero()).assertTrue(); // (p > 0) = true, (0 > 0) = false
             *       ```
             *
             */
            greaterThan(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is greater than or equal to another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is greater than or equal to b
             *
             * TODO: @see {@link greaterThan}
             *
             */
            greaterThanOrEqual(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is less than another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is less than b
             *
             * TODO: @see {@link greaterThan}
             *
             */
            lessThan(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is less than or equal to another
             * Cost: Moderate
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is less than or equal to b
             *
             * TODO: @see {@link greaterThan}
             */
            lessThanOrEqual(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is equal to another
             * Cost: Cheap
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is equal to b
             *
             * TODO: @see {@link greaterThan}
             */
            equals(a: any): Bool;
            /**
             * Checks if one ProvableBigInt is less than or equal to another
             * Cost: Cheap
             * @param a The ProvableBigInt to compare
             * @returns A Bool indicating if a is less than or equal to b
             *
             * TODO: @see {@link greaterThan}
             */
            assertEquals(a: any): void;
            fields: Field[];
            value: Unconstrained<bigint>;
        };
    };
    _provable?: ProvablePureExtended<ProvableBigInt<ProvableBigInt<any>>, {
        fields: bigint[];
    }, {
        fields: string[];
    }> | undefined;
    readonly provable: ProvablePureExtended<ProvableBigInt<ProvableBigInt<any>>, {
        fields: bigint[];
    }, {
        fields: string[];
    }>;
    _modulus?: ProvableBigInt<any> | undefined;
    _config?: BigIntParameter | undefined;
    readonly modulus: ProvableBigInt<any>;
    readonly config: BigIntParameter;
};
declare abstract class ProvableBigInt<T> {
    fields: Field[];
    value: Unconstrained<bigint>;
    static _provable?: ProvablePureExtended<ProvableBigInt<ProvableBigInt<any>>, {
        fields: bigint[];
    }, {
        fields: string[];
    }>;
    static get provable(): ProvablePureExtended<ProvableBigInt<ProvableBigInt<any>>, {
        fields: bigint[];
    }, {
        fields: string[];
    }>;
    static _modulus?: ProvableBigInt<any>;
    static _config?: BigIntParameter;
    static get modulus(): ProvableBigInt<any>;
    static get config(): BigIntParameter;
    constructor(fields: Field[], value: Unconstrained<bigint>);
    abstract get Constructor(): typeof ProvableBigInt;
    abstract toBigInt(): bigint;
    abstract toFields(): Field[];
    abstract toBits(): Bool[];
    abstract clone(): T;
    abstract add(a: T, isDouble?: boolean): T;
    abstract double(): T;
    abstract sub(a: T): T;
    abstract mul(a: T, isSquare?: boolean): T;
    abstract square(): T;
    abstract div(a: T): T;
    abstract inverse(): T;
    abstract negate(): T;
    abstract pow(exp: T): T;
    abstract sqrt(): T;
    abstract greaterThan(a: T): Bool;
    abstract greaterThanOrEqual(a: T): Bool;
    abstract lessThan(a: T): Bool;
    abstract lessThanOrEqual(a: T): Bool;
    abstract equals(a: T): Bool;
    abstract assertEquals(a: T): void;
}
