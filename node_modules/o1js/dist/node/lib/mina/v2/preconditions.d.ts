import { Compare, Eq, Option, Range } from './core.js';
import { StatePreconditions, StateDefinition, StateLayout } from './state.js';
import { Bool } from '../../provable/bool.js';
import { Field } from '../../provable/field.js';
import { UInt32 } from '../../provable/int.js';
import { PublicKey } from '../../provable/crypto/signature.js';
import { HashInput } from '../../provable/types/provable-derivers.js';
import * as BindingsLayout from '../../../bindings/mina-transaction/gen/v2/js-layout.js';
import { MinaAmount } from './currency.js';
export { Preconditions, Precondition, PreconditionsDescription, EpochDataPreconditions, EpochLedgerPreconditions, };
declare namespace Precondition {
    class Equals<T extends Eq<T>> {
        isEnabled: Bool;
        value: T;
        constructor(isEnabled: Bool, value: T);
        toStringHuman(): string;
        toValue<D>(defaultValue: D): T | D;
        mapToValue<D, R>(defaultValue: D, f: (t: T) => R): R | D;
        toOption(): Option<T>;
        isSatisfied(x: T): Bool;
        static disabled<T extends Eq<T>>(defaultValue: T): Equals<T>;
        static equals<T extends Eq<T>>(value: T): Equals<T>;
        static fromOption<T extends Eq<T>>(option: Option<T>): Equals<T>;
        static from<T extends Eq<T>>(value: Equals<T> | T | undefined, defaultValue: T): Equals<T>;
    }
    class InRange<T extends Compare<T>> {
        isEnabled: Bool;
        lower: T;
        upper: T;
        constructor(isEnabled: Bool, lower: T, upper: T);
        toStringHuman(): string;
        toValue<D>(defaultValue: D): {
            lower: T;
            upper: T;
        } | D;
        mapToValue<D, R>(defaultValue: D, f: (t: T) => R): {
            lower: R;
            upper: R;
        } | D;
        toOption(): Option<Range<T>>;
        isSatisfied(x: T): Bool;
        static disabled<T extends Compare<T>>(defaultValue: T | {
            lower: T;
            upper: T;
        }): InRange<T>;
        static equals<T extends Compare<T>>(value: T): InRange<T>;
        static betweenInclusive<T extends Compare<T>>(lower: T, upper: T): InRange<T>;
        static fromOption<T extends Compare<T>>(option: Option<Range<T>>): InRange<T>;
        static from<T extends Compare<T>>(value: InRange<T> | T | undefined, defaultValue: T | {
            lower: T;
            upper: T;
        }): InRange<T>;
    }
}
type PreconditionsDescription<State extends StateLayout> = {
    network?: NetworkPreconditionsDescription | NetworkPreconditions;
    account?: AccountPreconditionsDescription<State> | AccountPreconditions<State>;
    validWhile?: UInt32 | Precondition.InRange<UInt32>;
};
declare class Preconditions<State extends StateLayout = 'GenericState'> {
    readonly network: NetworkPreconditions;
    readonly account: AccountPreconditions<State>;
    readonly validWhile: Precondition.InRange<UInt32>;
    constructor(State: StateDefinition<State>, descr?: PreconditionsDescription<State>);
    toGeneric(): Preconditions;
    static fromGeneric<State extends StateLayout>(x: Preconditions, State: StateDefinition<State>): Preconditions<State>;
    toInternalRepr(): BindingsLayout.Preconditions;
    static fromInternalRepr(x: BindingsLayout.Preconditions): Preconditions;
    toJSON(): any;
    toInput(): HashInput;
    toFields(): Field[];
    static sizeInFields(): number;
    static emptyPoly<State extends StateLayout>(State: StateDefinition<State>): Preconditions<State>;
    static empty(): Preconditions;
    static check<State extends StateLayout>(_x: Preconditions<State>): void;
    static toJSON<State extends StateLayout>(x: Preconditions<State>): any;
    static toInput<State extends StateLayout>(x: Preconditions<State>): HashInput;
    static toFields<State extends StateLayout>(x: Preconditions<State>): Field[];
    static fromFields(fields: Field[], aux: any[]): Preconditions;
    static toAuxiliary<State extends StateLayout>(x?: Preconditions<State>): any[];
    static toValue<State extends StateLayout>(x: Preconditions<State>): Preconditions<State>;
    static fromValue<State extends StateLayout>(x: Preconditions<State>): Preconditions<State>;
    static from<State extends StateLayout>(State: StateDefinition<State>, value: Preconditions<State> | PreconditionsDescription<State> | undefined): Preconditions<State>;
}
type EpochLedgerPreconditionsDescription = {
    hash?: Field | Precondition.Equals<Field>;
    totalCurrency?: MinaAmount | Precondition.InRange<MinaAmount>;
};
declare class EpochLedgerPreconditions {
    readonly hash: Precondition.Equals<Field>;
    readonly totalCurrency: Precondition.InRange<MinaAmount>;
    constructor(descr?: EpochLedgerPreconditionsDescription);
    toInternalRepr(): BindingsLayout.EpochLedgerPrecondition;
    static fromInternalRepr(x: BindingsLayout.EpochLedgerPrecondition): EpochLedgerPreconditions;
    toJSON(): any;
    toInput(): HashInput;
    toFields(): Field[];
    static sizeInFields(): number;
    static empty(): EpochLedgerPreconditions;
    static check(_x: EpochLedgerPreconditions): void;
    static toJSON(x: EpochLedgerPreconditions): any;
    static toInput(x: EpochLedgerPreconditions): HashInput;
    static toFields(x: EpochLedgerPreconditions): Field[];
    static fromFields(fields: Field[], aux: any[]): EpochLedgerPreconditions;
    static toAuxiliary(x?: EpochLedgerPreconditions): any[];
    static toValue(x: EpochLedgerPreconditions): EpochLedgerPreconditions;
    static fromValue(x: EpochLedgerPreconditions): EpochLedgerPreconditions;
    static from(value: EpochLedgerPreconditions | EpochLedgerPreconditionsDescription | undefined): EpochLedgerPreconditions;
}
type EpochDataPreconditionsDescription = {
    ledger?: EpochLedgerPreconditions | EpochLedgerPreconditionsDescription;
    seed?: Field | Precondition.Equals<Field>;
    startCheckpoint?: Field | Precondition.Equals<Field>;
    lockCheckpoint?: Field | Precondition.Equals<Field>;
    epochLength?: UInt32 | Precondition.InRange<UInt32>;
};
declare class EpochDataPreconditions {
    readonly ledger: EpochLedgerPreconditions;
    readonly seed: Precondition.Equals<Field>;
    readonly startCheckpoint: Precondition.Equals<Field>;
    readonly lockCheckpoint: Precondition.Equals<Field>;
    readonly epochLength: Precondition.InRange<UInt32>;
    constructor(descr?: EpochDataPreconditionsDescription);
    toInternalRepr(): BindingsLayout.EpochDataPrecondition;
    static fromInternalRepr(x: BindingsLayout.EpochDataPrecondition): EpochDataPreconditions;
    toJSON(): any;
    toInput(): HashInput;
    toFields(): Field[];
    static sizeInFields(): number;
    static empty(): EpochDataPreconditions;
    static check(_x: EpochDataPreconditions): void;
    static toJSON(x: EpochDataPreconditions): any;
    static toInput(x: EpochDataPreconditions): HashInput;
    static toFields(x: EpochDataPreconditions): Field[];
    static fromFields(fields: Field[], aux: any[]): EpochDataPreconditions;
    static toAuxiliary(x?: EpochDataPreconditions): any[];
    static toValue(x: EpochDataPreconditions): EpochDataPreconditions;
    static fromValue(x: EpochDataPreconditions): EpochDataPreconditions;
    static from(value: EpochDataPreconditions | EpochDataPreconditionsDescription | undefined): EpochDataPreconditions;
}
type NetworkPreconditionsDescription = {
    snarkedLedgerHash?: Field | Precondition.Equals<Field>;
    blockchainLength?: UInt32 | Precondition.InRange<UInt32>;
    minWindowDensity?: UInt32 | Precondition.InRange<UInt32>;
    totalCurrency?: MinaAmount | Precondition.InRange<MinaAmount>;
    globalSlotSinceGenesis?: UInt32 | Precondition.InRange<UInt32>;
    stakingEpochData?: EpochDataPreconditions | EpochDataPreconditionsDescription;
    nextEpochData?: EpochDataPreconditions | EpochDataPreconditionsDescription;
};
declare class NetworkPreconditions {
    readonly snarkedLedgerHash: Precondition.Equals<Field>;
    readonly blockchainLength: Precondition.InRange<UInt32>;
    readonly minWindowDensity: Precondition.InRange<UInt32>;
    readonly totalCurrency: Precondition.InRange<MinaAmount>;
    readonly globalSlotSinceGenesis: Precondition.InRange<UInt32>;
    readonly stakingEpochData: EpochDataPreconditions;
    readonly nextEpochData: EpochDataPreconditions;
    constructor(descr?: NetworkPreconditionsDescription);
    toInternalRepr(): BindingsLayout.NetworkPrecondition;
    static fromInternalRepr(x: BindingsLayout.NetworkPrecondition): NetworkPreconditions;
    static empty(): NetworkPreconditions;
    toJSON(): any;
    toInput(): HashInput;
    toFields(): Field[];
    static sizeInFields(): number;
    static check(_x: NetworkPreconditions): void;
    static toJSON(x: NetworkPreconditions): any;
    static toInput(x: NetworkPreconditions): HashInput;
    static toFields(x: NetworkPreconditions): Field[];
    static fromFields(fields: Field[], aux: any[]): NetworkPreconditions;
    static toAuxiliary(x?: NetworkPreconditions): any[];
    static toValue(x: NetworkPreconditions): NetworkPreconditions;
    static fromValue(x: NetworkPreconditions): NetworkPreconditions;
    static from(value: NetworkPreconditions | NetworkPreconditionsDescription | undefined): NetworkPreconditions;
}
type AccountPreconditionsDescription<State extends StateLayout> = {
    balance?: MinaAmount | Precondition.InRange<MinaAmount>;
    nonce?: UInt32 | Precondition.InRange<UInt32>;
    receiptChainHash?: Field | Precondition.Equals<Field>;
    delegate?: PublicKey | Precondition.Equals<PublicKey>;
    state?: StatePreconditions<State>;
    actionState?: Field | Precondition.Equals<Field>;
    isProven?: Bool | Precondition.Equals<Bool>;
    isNew?: Bool | Precondition.Equals<Bool>;
};
declare class AccountPreconditions<State extends StateLayout = 'GenericState'> {
    readonly State: StateDefinition<State>;
    readonly balance: Precondition.InRange<MinaAmount>;
    readonly nonce: Precondition.InRange<UInt32>;
    readonly receiptChainHash: Precondition.Equals<Field>;
    readonly delegate: Precondition.Equals<PublicKey>;
    readonly state: StatePreconditions<State>;
    readonly actionState: Precondition.Equals<Field>;
    readonly isProven: Precondition.Equals<Bool>;
    readonly isNew: Precondition.Equals<Bool>;
    constructor(State: StateDefinition<State>, descr?: AccountPreconditionsDescription<State>);
    toGeneric(): AccountPreconditions;
    static fromGeneric<State extends StateLayout>(x: AccountPreconditions, State: StateDefinition<State>): AccountPreconditions<State>;
    toInternalRepr(): BindingsLayout.AccountPrecondition;
    static fromInternalRepr(x: BindingsLayout.AccountPrecondition): AccountPreconditions;
    toJSON(): any;
    toInput(): HashInput;
    toFields(): Field[];
    static generic(descr?: AccountPreconditionsDescription<'GenericState'>): AccountPreconditions;
    static sizeInFields(): number;
    static emptyPoly<State extends StateLayout>(State: StateDefinition<State>): AccountPreconditions<State>;
    static empty(): AccountPreconditions;
    static check<State extends StateLayout>(_x: AccountPreconditions<State>): void;
    static toJSON<State extends StateLayout>(x: AccountPreconditions<State>): any;
    static toInput<State extends StateLayout>(x: AccountPreconditions<State>): HashInput;
    static toFields<State extends StateLayout>(x: AccountPreconditions<State>): Field[];
    static fromFields(fields: Field[], aux: any[]): AccountPreconditions;
    static toAuxiliary<State extends StateLayout>(x?: AccountPreconditions<State>): any[];
    static toValue<State extends StateLayout>(x: AccountPreconditions<State>): AccountPreconditions<State>;
    static fromValue<State extends StateLayout>(x: AccountPreconditions<State>): AccountPreconditions<State>;
    static from<State extends StateLayout>(State: StateDefinition<State>, value: AccountPreconditions<State> | AccountPreconditionsDescription<State> | undefined): AccountPreconditions<State>;
}
