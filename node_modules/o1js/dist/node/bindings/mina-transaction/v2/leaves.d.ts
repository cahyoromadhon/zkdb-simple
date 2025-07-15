import { ProvableSerializable } from './util.js';
import { Bool } from '../../../lib/provable/bool.js';
import { Field } from '../../../lib/provable/field.js';
import { Provable } from '../../../lib/provable/provable.js';
import { HashInput } from '../../../lib/provable/types/provable-derivers.js';
export { Bool } from '../../../lib/provable/bool.js';
export { Field } from '../../../lib/provable/field.js';
export { Int64, UInt32, UInt64, Sign } from '../../../lib/provable/int.js';
export { PublicKey } from '../../../lib/provable/crypto/signature.js';
export interface Option<T> {
    isSome: Bool;
    value: T;
}
export declare function Option<T>(T: ProvableSerializable<T>): {
    sizeInFields(): number;
    toJSON(x: Option<T>): any;
    toInput(x: Option<T>): HashInput;
    toFields(x: Option<T>): Field[];
    toAuxiliary(x?: Option<T>): any[];
    fromFields(fields: Field[], aux: any[]): Option<T>;
    toValue(x: Option<T>): Option<T>;
    fromValue(x: Option<T>): Option<T>;
    check(_x: Option<T>): never;
};
export declare namespace Option {
    var map: <A, B>(option: Option<A>, f: (value: A) => B) => Option<B>;
    var none: <T>(defaultValue: T) => Option<T>;
    var some: <T>(value: T) => Option<T>;
}
export interface Range<T> {
    lower: T;
    upper: T;
}
export declare function Range<T>(T: Provable<T>): (new (value: {
    lower: T;
    upper: T;
}) => {
    lower: T;
    upper: T;
}) & {
    _isStruct: true;
} & Provable<{
    lower: T;
    upper: T;
}, {
    lower: any;
    upper: any;
}> & {
    fromValue: (value: {
        lower: any;
        upper: any;
    }) => {
        lower: T;
        upper: T;
    };
    toInput: (x: {
        lower: T;
        upper: T;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        lower: T;
        upper: T;
    }) => {
        lower: {
            toFields: {};
            toAuxiliary: {};
            fromFields: {};
            sizeInFields: {};
            check: {};
            toValue: {};
            fromValue: {};
            toCanonical?: {} | null | undefined;
        };
        upper: {
            toFields: {};
            toAuxiliary: {};
            fromFields: {};
            sizeInFields: {};
            check: {};
            toValue: {};
            fromValue: {};
            toCanonical?: {} | null | undefined;
        };
    };
    fromJSON: (x: {
        lower: {
            toFields: {};
            toAuxiliary: {};
            fromFields: {};
            sizeInFields: {};
            check: {};
            toValue: {};
            fromValue: {};
            toCanonical?: {} | null | undefined;
        };
        upper: {
            toFields: {};
            toAuxiliary: {};
            fromFields: {};
            sizeInFields: {};
            check: {};
            toValue: {};
            fromValue: {};
            toCanonical?: {} | null | undefined;
        };
    }) => {
        lower: T;
        upper: T;
    };
    empty: () => {
        lower: T;
        upper: T;
    };
};
export interface CommittedList {
    data: Field[][];
    hash: Field;
}
export declare const CommittedList: ProvableSerializable<CommittedList>;
export type Events = CommittedList;
export declare const Events: ProvableSerializable<CommittedList>;
export type Actions = CommittedList;
export declare const Actions: ProvableSerializable<CommittedList>;
export type AuthRequiredIdentifier = 'Impossible' | 'None' | 'Proof' | 'Signature' | 'Either';
export interface AuthRequired {
    constant: Bool;
    signatureNecessary: Bool;
    signatureSufficient: Bool;
}
export declare const AuthRequired: {
    empty(): AuthRequired;
    isImpossible(x: AuthRequired): Bool;
    isNone(x: AuthRequired): Bool;
    isProof(x: AuthRequired): Bool;
    isSignature(x: AuthRequired): Bool;
    isEither(x: AuthRequired): Bool;
    identifier(x: AuthRequired): AuthRequiredIdentifier;
    toJSON(x: AuthRequired): any;
    toFields: (value: AuthRequired) => Field[];
    toAuxiliary: (value?: AuthRequired | undefined) => any[];
    fromFields: (fields: Field[], aux: any[]) => AuthRequired;
    sizeInFields(): number;
    check: (value: AuthRequired) => void;
    toValue: (x: AuthRequired) => AuthRequired;
    fromValue: (x: AuthRequired) => AuthRequired;
    toCanonical?: ((x: AuthRequired) => AuthRequired) | undefined;
    toInput(x: AuthRequired): HashInput;
};
export type StateHash = Field;
export declare const StateHash: ProvableSerializable<StateHash>;
export type TokenId = Field;
export declare const TokenId: typeof Field;
export interface TokenSymbol {
    field: Field;
    symbol: string;
}
export declare const TokenSymbol: ProvableSerializable<TokenSymbol>;
export interface ZkappUri {
    data: string;
    hash: Field;
}
export declare const ZkappUri: ProvableSerializable<ZkappUri>;
