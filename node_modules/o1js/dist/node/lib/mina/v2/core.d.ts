import { Bool } from '../../provable/bool.js';
import { Field } from '../../provable/field.js';
import { Provable } from '../../provable/types/provable-intf.js';
import * as Bindings from '../../../bindings/mina-transaction/v2/index.js';
import { Types } from '../../../bindings/mina-transaction/v1/types.js';
export { Option, Range, mapUndefined, Empty, Update, Compare, Eq, ToFields, Tuple, ProvableTuple, ProvableInstance, ProvableTupleInstances, TokenId, ZkappUri, mapObject, };
declare function mapObject<In extends {
    [key: string]: any;
}, Out extends {
    [key in keyof In]: any;
}>(object: In, f: <Key extends keyof In>(key: Key) => Out[Key]): {
    [key in keyof In]: Out[key];
};
declare const Option: typeof Bindings.Leaves.Option, Range: typeof Bindings.Leaves.Range;
type Option<T> = Bindings.Leaves.Option<T>;
type Range<T> = Bindings.Leaves.Range<T>;
declare class ZkappUri {
    readonly data: string;
    readonly hash: Field;
    constructor(uri: string | {
        data: string;
        hash: Field;
    });
    toJSON(): Types.Json.AccountUpdate['body']['update']['zkappUri'];
    static empty(): ZkappUri;
    static from(uri: ZkappUri | string): ZkappUri;
}
declare class TokenId {
    value: Field;
    constructor(value: Field);
    equals(x: TokenId): Bool;
    toString(): string;
    static MINA: TokenId;
}
declare function mapUndefined<A, B>(value: A | undefined, f: (a: A) => B): B | undefined;
interface Empty<T> {
    empty: () => T;
}
interface Eq<T> {
    equals(x: T): Bool;
}
type Compare<T extends Compare<T>> = Eq<T> & {
    lessThan(x: T): Bool;
    lessThanOrEqual(x: T): Bool;
    greaterThan(x: T): Bool;
    greaterThanOrEqual(x: T): Bool;
};
interface ToFields {
    toFields(): Field[];
}
type Tuple<T> = [T, ...T[]] | [];
type ProvableTuple = Tuple<Provable<any>>;
type ProvableInstance<P> = P extends Provable<infer T> ? (unknown extends T ? T : never) : never;
type ProvableTupleInstances<T extends ProvableTuple> = {
    [I in keyof T]: ProvableInstance<T[I]>;
};
declare class Update<T> {
    set: Bool;
    value: T;
    constructor(set: Bool, value: T);
    toOption(): Option<T>;
    static fromOption<T>(option: Option<T>): Update<T>;
    static disabled<T>(defaultValue: T): Update<T>;
    static set<T>(value: T): Update<T>;
    static from<T>(value: Update<T> | T | undefined, defaultValue: T): Update<T>;
}
