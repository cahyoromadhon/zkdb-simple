import { Field, Bool } from '../../../lib/provable/wrapped.js';
import { UInt32, UInt64, Sign, Int64 } from '../../../lib/provable/int.js';
import { PublicKey } from '../../../lib/provable/crypto/signature.js';
export { PublicKey, Field, Bool, AuthRequired, UInt64, UInt32, Sign, BalanceChange, TokenId };
export { Events, Actions, ZkappUri, TokenSymbol, ActionState, VerificationKeyHash, ReceiptChainHash, StateHash, TransactionVersion, MayUseToken, };
type AuthRequired = {
    constant: Bool;
    signatureNecessary: Bool;
    signatureSufficient: Bool;
};
type TokenId = Field;
type StateHash = Field;
type TokenSymbol = {
    symbol: string;
    field: Field;
};
type ZkappUri = {
    data: string;
    hash: Field;
};
declare const TokenId: Omit<import("../../lib/generic.js").GenericProvableExtended<import("../v2/leaves.js").Field, bigint, string, import("../v2/leaves.js").Field>, "toJSON" | "fromJSON"> & {
    empty: () => import("../v2/leaves.js").Field;
    toJSON(x: import("../v2/leaves.js").Field): string;
    fromJSON(x: string): import("../v2/leaves.js").Field;
}, StateHash: Omit<import("../../lib/generic.js").GenericProvableExtended<import("../v2/leaves.js").Field, bigint, string, import("../v2/leaves.js").Field>, "toJSON" | "fromJSON"> & {
    empty: () => import("../v2/leaves.js").Field;
    toJSON(x: import("../v2/leaves.js").Field): string;
    fromJSON(x: string): import("../v2/leaves.js").Field;
}, TokenSymbol: Omit<import("../../lib/generic.js").GenericProvableExtended<{
    field: import("../v2/leaves.js").Field;
    symbol: string;
}, {
    field: bigint;
    symbol: string;
}, {
    field: string;
    symbol: string;
}, import("../v2/leaves.js").Field>, "toJSON" | "fromJSON"> & {
    toInput({ field }: {
        symbol: string;
        field: import("../v2/leaves.js").Field;
    }): import("../../lib/generic.js").GenericHashInput<import("../v2/leaves.js").Field>;
    toJSON({ symbol }: {
        symbol: string;
        field: import("../v2/leaves.js").Field;
    }): string;
    fromJSON(symbol: string): {
        symbol: string;
        field: import("../v2/leaves.js").Field;
    };
}, AuthRequired: Omit<import("../../lib/generic.js").GenericProvableExtended<{
    constant: import("../v2/leaves.js").Bool;
    signatureNecessary: import("../v2/leaves.js").Bool;
    signatureSufficient: import("../v2/leaves.js").Bool;
}, {
    constant: boolean;
    signatureNecessary: boolean;
    signatureSufficient: boolean;
}, {
    constant: boolean;
    signatureNecessary: boolean;
    signatureSufficient: boolean;
}, import("../v2/leaves.js").Field>, "toJSON" | "fromJSON"> & {
    empty(): {
        constant: import("../v2/leaves.js").Bool;
        signatureNecessary: import("../v2/leaves.js").Bool;
        signatureSufficient: import("../v2/leaves.js").Bool;
    };
    toJSON(x: {
        constant: import("../v2/leaves.js").Bool;
        signatureNecessary: import("../v2/leaves.js").Bool;
        signatureSufficient: import("../v2/leaves.js").Bool;
    }): import("./transaction-leaves-json.js").AuthRequired;
    fromJSON(json: import("./transaction-leaves-json.js").AuthRequired): {
        constant: import("../v2/leaves.js").Bool;
        signatureNecessary: import("../v2/leaves.js").Bool;
        signatureSufficient: import("../v2/leaves.js").Bool;
    };
}, ZkappUri: import("../../lib/generic.js").GenericProvableExtended<{
    data: string;
    hash: import("../v2/leaves.js").Field;
}, {
    data: string;
    hash: bigint;
}, string, import("../v2/leaves.js").Field>;
type Event = Field[];
type Events = {
    hash: Field;
    data: Event[];
};
type Actions = Events;
declare const Events: {
    toFields: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    } | undefined) => any[];
    fromFields: (x: import("../v2/leaves.js").Field[], aux: any[]) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    sizeInFields(): number;
    check: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => void;
    toValue: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => {
        data: bigint[][];
        hash: bigint;
    };
    fromValue: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    } | {
        data: bigint[][];
        hash: bigint;
    }) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    toCanonical?: ((x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) | undefined;
    toInput: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => string[][];
    fromJSON: (x: string[][]) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    empty: () => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    pushEvent(events: {
        hash: import("../v2/leaves.js").Field;
        data: import("../v2/leaves.js").Field[][];
    }, event: import("../v2/leaves.js").Field[]): {
        hash: import("../v2/leaves.js").Field;
        data: import("../v2/leaves.js").Field[][];
    };
    fromList(events: import("../v2/leaves.js").Field[][]): {
        hash: import("../v2/leaves.js").Field;
        data: import("../v2/leaves.js").Field[][];
    };
    hash(events: import("../v2/leaves.js").Field[][]): import("../v2/leaves.js").Field;
}, Actions: {
    toFields: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    } | undefined) => any[];
    fromFields: (x: import("../v2/leaves.js").Field[], aux: any[]) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    sizeInFields(): number;
    check: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => void;
    toValue: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => {
        data: bigint[][];
        hash: bigint;
    };
    fromValue: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    } | {
        data: bigint[][];
        hash: bigint;
    }) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    toCanonical?: ((x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) | undefined;
    toInput: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    }) => string[][];
    fromJSON: (x: string[][]) => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    empty: () => {
        data: import("../v2/leaves.js").Field[][];
        hash: import("../v2/leaves.js").Field;
    };
    pushEvent(actions: {
        hash: import("../v2/leaves.js").Field;
        data: import("../v2/leaves.js").Field[][];
    }, event: import("../v2/leaves.js").Field[]): {
        hash: import("../v2/leaves.js").Field;
        data: import("../v2/leaves.js").Field[][];
    };
    fromList(events: import("../v2/leaves.js").Field[][]): {
        hash: import("../v2/leaves.js").Field;
        data: import("../v2/leaves.js").Field[][];
    };
    hash(events: import("../v2/leaves.js").Field[][]): import("../v2/leaves.js").Field;
    emptyActionState(): import("../v2/leaves.js").Field;
    updateSequenceState(state: import("../v2/leaves.js").Field, sequenceEventsHash: import("../v2/leaves.js").Field): import("../v2/leaves.js").Field;
};
type ActionState = Field;
declare const ActionState: {
    empty: () => import("../v2/leaves.js").Field;
    toFields: (x: import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: import("../v2/leaves.js").Field | undefined) => any[];
    sizeInFields: () => number;
    check: (x: import("../v2/leaves.js").Field) => void;
    toValue: (x: import("../v2/leaves.js").Field) => bigint;
    fromValue: (x: bigint | import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field;
    toCanonical?: ((x: import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field) | undefined;
    fromFields: (x: import("../v2/leaves.js").Field[]) => import("../v2/leaves.js").Field;
    toInput: (x: import("../v2/leaves.js").Field) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: import("../v2/leaves.js").Field) => string;
    fromJSON: (x: string) => import("../v2/leaves.js").Field;
};
type VerificationKeyHash = Field;
declare const VerificationKeyHash: {
    empty: () => import("../v2/leaves.js").Field;
    toFields: (x: import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: import("../v2/leaves.js").Field | undefined) => any[];
    sizeInFields: () => number;
    check: (x: import("../v2/leaves.js").Field) => void;
    toValue: (x: import("../v2/leaves.js").Field) => bigint;
    fromValue: (x: bigint | import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field;
    toCanonical?: ((x: import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field) | undefined;
    fromFields: (x: import("../v2/leaves.js").Field[]) => import("../v2/leaves.js").Field;
    toInput: (x: import("../v2/leaves.js").Field) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: import("../v2/leaves.js").Field) => string;
    fromJSON: (x: string) => import("../v2/leaves.js").Field;
};
type ReceiptChainHash = Field;
declare const ReceiptChainHash: {
    empty: () => import("../v2/leaves.js").Field;
    toFields: (x: import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: import("../v2/leaves.js").Field | undefined) => any[];
    sizeInFields: () => number;
    check: (x: import("../v2/leaves.js").Field) => void;
    toValue: (x: import("../v2/leaves.js").Field) => bigint;
    fromValue: (x: bigint | import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field;
    toCanonical?: ((x: import("../v2/leaves.js").Field) => import("../v2/leaves.js").Field) | undefined;
    fromFields: (x: import("../v2/leaves.js").Field[]) => import("../v2/leaves.js").Field;
    toInput: (x: import("../v2/leaves.js").Field) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: import("../v2/leaves.js").Field) => string;
    fromJSON: (x: string) => import("../v2/leaves.js").Field;
};
type TransactionVersion = Field;
declare const TransactionVersion: {
    empty: () => UInt32;
    toFields: (x: UInt32) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: UInt32 | undefined) => any[];
    sizeInFields: () => number;
    check: (x: UInt32) => void;
    toValue: (x: UInt32) => bigint;
    fromValue: (x: bigint | UInt32) => UInt32;
    toCanonical?: ((x: UInt32) => UInt32) | undefined;
    fromFields: (x: import("../v2/leaves.js").Field[]) => UInt32;
    toInput: (x: UInt32) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: UInt32) => string;
    fromJSON: (x: string) => UInt32;
};
type BalanceChange = Int64;
declare const BalanceChange: typeof Int64;
type MayUseToken = {
    parentsOwnToken: Bool;
    inheritFromParent: Bool;
};
declare const MayUseToken: {
    check: ({ parentsOwnToken, inheritFromParent }: MayUseToken) => void;
    toFields: (x: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    }) => import("../v2/leaves.js").Field[];
    toAuxiliary: (x?: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    } | undefined) => any[];
    sizeInFields: () => number;
    toValue: (x: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    }) => {
        parentsOwnToken: boolean;
        inheritFromParent: boolean;
    };
    fromValue: (x: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    } | {
        parentsOwnToken: boolean;
        inheritFromParent: boolean;
    }) => {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    };
    toCanonical?: ((x: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    }) => {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    }) | undefined;
    fromFields: (x: import("../v2/leaves.js").Field[]) => {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    };
    toInput: (x: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    }) => {
        fields?: import("../v2/leaves.js").Field[] | undefined;
        packed?: [import("../v2/leaves.js").Field, number][] | undefined;
    };
    toJSON: (x: {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    }) => {
        parentsOwnToken: boolean;
        inheritFromParent: boolean;
    };
    fromJSON: (x: {
        parentsOwnToken: boolean;
        inheritFromParent: boolean;
    }) => {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    };
    empty: () => {
        parentsOwnToken: import("../v2/leaves.js").Bool;
        inheritFromParent: import("../v2/leaves.js").Bool;
    };
};
