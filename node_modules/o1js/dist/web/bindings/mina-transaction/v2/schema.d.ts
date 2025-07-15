import * as BindingsLeaves from './leaves.js';
import { ProvableSerializable } from './util.js';
import { Provable } from '../../../lib/provable/provable.js';
import { HashInput } from '../../../lib/provable/types/provable-derivers.js';
declare abstract class ProvableBindingsType<T, Actual> {
    abstract Type(): ProvableSerializable<Actual>;
    sizeInFields(): number;
    toJSON(x: T): any;
    toInput(x: T): HashInput;
    toFields(x: T): BindingsLeaves.Field[];
    toAuxiliary(x?: T): any[];
    fromFields(fields: BindingsLeaves.Field[], aux: any[]): T;
    toValue(x: T): T;
    fromValue(x: T): T;
    check(x: T): void;
}
export type BindingsType<T> = BindingsType.Leaf<T> | BindingsType.Object<T> | BindingsType.Option<T> | BindingsType.Array<T>;
export declare namespace BindingsType {
    class Object<T> implements Provable<T> {
        readonly _T: T extends {
            [key: string]: any;
        } ? void : never;
        readonly name: string;
        readonly keys: (keyof T)[];
        readonly entries: T extends {
            [key: string]: any;
        } ? {
            [key in keyof T]: BindingsType<T[key]>;
        } : never;
        constructor({ name, keys, entries, }: {
            name: Object<T>['name'];
            keys: Object<T>['keys'];
            entries: Object<T>['entries'];
        });
        sizeInFields(): number;
        toJSON(x: T): any;
        toInput(x: T): HashInput;
        toFields(x: T): BindingsLeaves.Field[];
        toAuxiliary(x?: T): any[];
        fromFields(fields: BindingsLeaves.Field[], aux: any[]): T;
        toValue(x: T): T;
        fromValue(x: T): T;
        check(_x: T): void;
    }
    class Array<T> implements Provable<T> {
        readonly _T: T extends any[] ? void : never;
        readonly staticLength: number | null;
        readonly inner: T extends (infer U)[] ? BindingsType<U> : never;
        constructor({ staticLength, inner, }: {
            staticLength: Array<T>['staticLength'];
            inner: Array<T>['inner'];
        });
        sizeInFields(): number;
        toJSON(x: T extends any[] ? T : never): any;
        toInput(x: T): HashInput;
        toFields(x: T): BindingsLeaves.Field[];
        toAuxiliary(x?: T): any[];
        fromFields(fields: BindingsLeaves.Field[], aux: any[]): T;
        toValue(x: T): T;
        fromValue(x: T): T;
        check(_x: T): void;
    }
    type Option<T> = Option.OrUndefined<T> | Option.Flagged<T> | Option.ClosedInterval<T>;
    namespace Option {
        class OrUndefined<T> implements Provable<T> {
            readonly inner: T extends infer U | undefined ? BindingsType<U> : never;
            readonly _T: T extends infer _U | undefined ? void : never;
            constructor(inner: T extends infer U | undefined ? BindingsType<U> : never);
            sizeInFields(): number;
            toJSON(x: T): any;
            toInput(_x: T): any;
            toFields(_x: T): BindingsLeaves.Field[];
            toAuxiliary(x?: T): any[];
            fromFields(fields: BindingsLeaves.Field[], aux: any[]): T;
            toValue(x: T): T;
            fromValue(x: T): T;
            check(_x: T): void;
        }
        class Flagged<T> extends ProvableBindingsType<T, BindingsLeaves.Option<any>> {
            readonly inner: T extends BindingsLeaves.Option<infer U> ? BindingsType<U> : never;
            readonly _T: T extends BindingsLeaves.Option<any> ? void : never;
            constructor(inner: T extends BindingsLeaves.Option<infer U> ? BindingsType<U> : never);
            Type(): {
                sizeInFields(): number;
                toJSON(x: BindingsLeaves.Option<any>): any;
                toInput(x: BindingsLeaves.Option<any>): HashInput;
                toFields(x: BindingsLeaves.Option<any>): BindingsLeaves.Field[];
                toAuxiliary(x?: BindingsLeaves.Option<any> | undefined): any[];
                fromFields(fields: BindingsLeaves.Field[], aux: any[]): BindingsLeaves.Option<any>;
                toValue(x: BindingsLeaves.Option<any>): BindingsLeaves.Option<any>;
                fromValue(x: BindingsLeaves.Option<any>): BindingsLeaves.Option<any>;
                check(_x: BindingsLeaves.Option<any>): never;
            };
        }
        class ClosedInterval<T> extends ProvableBindingsType<T, BindingsLeaves.Option<BindingsLeaves.Range<any>>> {
            readonly inner: T extends BindingsLeaves.Option<BindingsLeaves.Range<infer U>> ? BindingsType<U> : never;
            readonly _T: T extends BindingsLeaves.Option<BindingsLeaves.Range<any>> ? void : never;
            constructor(inner: T extends BindingsLeaves.Option<BindingsLeaves.Range<infer U>> ? BindingsType<U> : never);
            Type(): {
                sizeInFields(): number;
                toJSON(x: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>): any;
                toInput(x: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>): HashInput;
                toFields(x: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>): BindingsLeaves.Field[];
                toAuxiliary(x?: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }> | undefined): any[];
                fromFields(fields: BindingsLeaves.Field[], aux: any[]): BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>;
                toValue(x: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>): BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>;
                fromValue(x: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>): BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>;
                check(_x: BindingsLeaves.Option<{
                    lower: any;
                    upper: any;
                }>): never;
            };
        }
    }
    type Leaf<T> = Leaf.Number<T> | Leaf.String<T> | Leaf.Actions<T> | Leaf.AuthRequired<T> | Leaf.Bool<T> | Leaf.Events<T> | Leaf.Field<T> | Leaf.Int64<T> | Leaf.PublicKey<T> | Leaf.Sign<T> | Leaf.StateHash<T> | Leaf.TokenId<T> | Leaf.TokenSymbol<T> | Leaf.UInt32<T> | Leaf.UInt64<T> | Leaf.ZkappUri<T>;
    namespace Leaf {
        abstract class AuxiliaryLeaf<T> {
            constructor();
            sizeInFields(): number;
            toJSON(x: T): any;
            toInput(_x: T): HashInput;
            toFields(_x: T): BindingsLeaves.Field[];
            toAuxiliary(x?: T): any[];
            fromFields(_fields: BindingsLeaves.Field[], aux: any[]): T;
            toValue(x: T): T;
            fromValue(x: T): T;
            check(_x: T): void;
        }
        export class Number<T = number> extends AuxiliaryLeaf<T> {
            readonly _T: T extends number ? void : never;
            readonly type: 'number';
        }
        export class String<T = string> extends AuxiliaryLeaf<T> {
            readonly _T: T extends string ? void : never;
            readonly type: 'string';
        }
        export class Actions<T = BindingsLeaves.Actions> extends ProvableBindingsType<T, BindingsLeaves.Actions> {
            readonly _T: T extends number ? void : never;
            readonly type: 'number';
            Type(): ProvableSerializable<BindingsLeaves.CommittedList>;
        }
        export class AuthRequired<T = BindingsLeaves.AuthRequired> extends ProvableBindingsType<T, BindingsLeaves.AuthRequired> {
            readonly _T: T extends BindingsLeaves.AuthRequired ? void : never;
            readonly type: 'AuthRequired';
            Type(): {
                empty(): BindingsLeaves.AuthRequired;
                isImpossible(x: BindingsLeaves.AuthRequired): BindingsLeaves.Bool;
                isNone(x: BindingsLeaves.AuthRequired): BindingsLeaves.Bool;
                isProof(x: BindingsLeaves.AuthRequired): BindingsLeaves.Bool;
                isSignature(x: BindingsLeaves.AuthRequired): BindingsLeaves.Bool;
                isEither(x: BindingsLeaves.AuthRequired): BindingsLeaves.Bool;
                identifier(x: BindingsLeaves.AuthRequired): BindingsLeaves.AuthRequiredIdentifier;
                toJSON(x: BindingsLeaves.AuthRequired): any;
                toFields: (value: BindingsLeaves.AuthRequired) => BindingsLeaves.Field[];
                toAuxiliary: (value?: BindingsLeaves.AuthRequired | undefined) => any[];
                fromFields: (fields: BindingsLeaves.Field[], aux: any[]) => BindingsLeaves.AuthRequired;
                sizeInFields(): number;
                check: (value: BindingsLeaves.AuthRequired) => void;
                toValue: (x: BindingsLeaves.AuthRequired) => BindingsLeaves.AuthRequired;
                fromValue: (x: BindingsLeaves.AuthRequired) => BindingsLeaves.AuthRequired;
                toCanonical?: ((x: BindingsLeaves.AuthRequired) => BindingsLeaves.AuthRequired) | undefined;
                toInput(x: BindingsLeaves.AuthRequired): HashInput;
            };
        }
        export class Bool<T = BindingsLeaves.Bool> extends ProvableBindingsType<T, BindingsLeaves.Bool> {
            readonly _T: T extends BindingsLeaves.Bool ? void : never;
            readonly type: 'Bool';
            Type(): typeof BindingsLeaves.Bool;
        }
        export class Events<T = BindingsLeaves.Events> extends ProvableBindingsType<T, BindingsLeaves.Events> {
            readonly _T: T extends number ? void : never;
            readonly type: 'number';
            Type(): ProvableSerializable<BindingsLeaves.CommittedList>;
        }
        export class Field<T = BindingsLeaves.Field> extends ProvableBindingsType<T, BindingsLeaves.Field> {
            readonly _T: T extends BindingsLeaves.Field ? void : never;
            readonly type: 'Field';
            Type(): typeof BindingsLeaves.Field;
        }
        export class Int64<T = BindingsLeaves.Int64> extends ProvableBindingsType<T, BindingsLeaves.Int64> {
            readonly _T: T extends BindingsLeaves.Int64 ? void : never;
            readonly type: 'Int64';
            Type(): typeof BindingsLeaves.Int64;
        }
        export class PublicKey<T = BindingsLeaves.PublicKey> extends ProvableBindingsType<T, BindingsLeaves.PublicKey> {
            readonly _T: T extends BindingsLeaves.PublicKey ? void : never;
            readonly type: 'PublicKey';
            Type(): typeof BindingsLeaves.PublicKey;
        }
        export class Sign<T = BindingsLeaves.Sign> extends ProvableBindingsType<T, BindingsLeaves.Sign> {
            readonly _T: T extends BindingsLeaves.Sign ? void : never;
            readonly type: 'Sign';
            Type(): typeof BindingsLeaves.Sign;
        }
        export class StateHash<T = BindingsLeaves.StateHash> extends ProvableBindingsType<T, BindingsLeaves.StateHash> {
            readonly _T: T extends BindingsLeaves.StateHash ? void : never;
            readonly type: 'StateHash';
            Type(): ProvableSerializable<BindingsLeaves.Field>;
        }
        export class TokenId<T = BindingsLeaves.TokenId> implements Provable<T> {
            readonly _T: T extends BindingsLeaves.TokenId ? void : never;
            readonly type: 'TokenId';
            constructor();
            sizeInFields(): number;
            toJSON(x: T): any;
            toInput(x: T): HashInput;
            toFields(x: T): BindingsLeaves.Field[];
            toAuxiliary(_x?: T): any[];
            fromFields(fields: BindingsLeaves.Field[], _aux: any[]): T;
            toValue(x: T): T;
            fromValue(x: T): T;
            check(_x: T): void;
        }
        export class TokenSymbol<T = BindingsLeaves.TokenSymbol> extends ProvableBindingsType<T, BindingsLeaves.TokenSymbol> {
            readonly _T: T extends BindingsLeaves.TokenId ? void : never;
            readonly type: 'TokenId';
            Type(): ProvableSerializable<BindingsLeaves.TokenSymbol>;
        }
        export class UInt32<T = BindingsLeaves.UInt32> extends ProvableBindingsType<T, BindingsLeaves.UInt32> {
            readonly _T: T extends BindingsLeaves.UInt32 ? void : never;
            readonly type: 'UInt32';
            Type(): typeof BindingsLeaves.UInt32;
        }
        export class UInt64<T = BindingsLeaves.UInt64> extends ProvableBindingsType<T, BindingsLeaves.UInt64> {
            readonly _T: T extends BindingsLeaves.UInt64 ? void : never;
            readonly type: 'UInt64';
            Type(): typeof BindingsLeaves.UInt64;
        }
        export class ZkappUri<T = BindingsLeaves.ZkappUri> extends ProvableBindingsType<T, BindingsLeaves.ZkappUri> {
            readonly _T: T extends BindingsLeaves.ZkappUri ? void : never;
            readonly type: 'ZkappUri';
            Type(): ProvableSerializable<BindingsLeaves.ZkappUri>;
        }
        export {};
    }
}
export {};
