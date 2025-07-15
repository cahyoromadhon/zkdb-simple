import { Permissions } from './permissions.js';
import { StateDefinition, StateLayout, StateValues } from './state.js';
import { VerificationKey } from '../../proof-system/verification-key.js';
import { Bool } from '../../provable/bool.js';
import { Field } from '../../provable/field.js';
import { UInt64, UInt32 } from '../../provable/int.js';
import { PublicKey } from '../../provable/crypto/signature.js';
import { Unconstrained } from '../../provable/types/unconstrained.js';
import { TokenSymbol } from '../../../lib/provable/crypto/poseidon.js';
import { TokenId, ZkappUri } from './core.js';
export { AccountId, AccountTiming, AccountIdSet, Account, AccountIdMap };
declare class AccountId {
    publicKey: PublicKey;
    tokenId: TokenId;
    constructor(publicKey: PublicKey, tokenId: TokenId);
    equals(x: AccountId): Bool;
    static empty(): AccountId;
    static sizeInFields(): number;
    static toFields(x: AccountId): Field[];
    static toAuxiliary(_x?: AccountId): any[];
    static fromFields(fields: Field[], _aux: any[]): AccountId;
    static toValue(x: AccountId): AccountId;
    static fromValue(x: AccountId): AccountId;
    static check(_x: AccountId): void;
}
declare class AccountIdMap<T> {
    private data;
    constructor();
    has(accountId: AccountId): boolean;
    get(accountId: AccountId): T | null;
    set(accountId: AccountId, value: T): void;
    update(accountId: AccountId, f: (x: T | null) => T): void;
}
declare class AccountIdSet {
    private idMap;
    constructor();
    has(accountId: AccountId): boolean;
    add(accountId: AccountId): void;
}
declare class AccountTiming {
    initialMinimumBalance: UInt64;
    cliffTime: UInt32;
    cliffAmount: UInt64;
    vestingPeriod: UInt32;
    vestingIncrement: UInt64;
    constructor({ initialMinimumBalance, cliffTime, cliffAmount, vestingPeriod, vestingIncrement, }: {
        initialMinimumBalance: UInt64;
        cliffTime: UInt32;
        cliffAmount: UInt64;
        vestingPeriod: UInt32;
        vestingIncrement: UInt64;
    });
    minimumBalanceAtSlot(globalSlot: UInt32): UInt64;
    static empty(): AccountTiming;
}
declare class Account<State extends StateLayout = 'GenericState'> {
    State: StateDefinition<State>;
    isNew: Unconstrained<boolean>;
    accountId: AccountId;
    tokenSymbol: TokenSymbol;
    balance: UInt64;
    nonce: UInt32;
    receiptChainHash: Field;
    delegate: PublicKey | null;
    votingFor: Field;
    timing: AccountTiming;
    permissions: Permissions;
    zkapp: {
        state: StateValues<State>;
        verificationKey: VerificationKey;
        actionState: Field[];
        isProven: Bool;
        zkappUri: ZkappUri;
    };
    constructor(State: StateDefinition<State>, isNew: boolean | Unconstrained<boolean>, data: {
        accountId: AccountId;
        tokenSymbol: TokenSymbol;
        balance: UInt64;
        nonce: UInt32;
        receiptChainHash: Field;
        delegate: PublicKey | null;
        votingFor: Field;
        timing: AccountTiming;
        permissions: Permissions;
        zkapp?: {
            state: StateValues<State>;
            verificationKey: VerificationKey;
            actionState: Field[];
            isProven: Bool;
            zkappUri: ZkappUri;
        };
    });
    toGeneric(): Account;
    static fromGeneric<State extends StateLayout>(account: Account, State: StateDefinition<State>): Account<State>;
    static empty(accountId: AccountId): Account;
}
