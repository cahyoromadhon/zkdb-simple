import { AccountId, AccountTiming } from './account.js';
import { AccountUpdateAuthorization, AccountUpdateAuthorizationEnvironment, AccountUpdateAuthorizationKind, AccountUpdateAuthorizationKindIdentifier, AccountUpdateAuthorizationKindWithZkappContext } from './authorization.js';
import { Update, ZkappUri } from './core.js';
import { Permissions, PermissionsDescription } from './permissions.js';
import { Preconditions, PreconditionsDescription } from './preconditions.js';
import { StateDefinition, StateLayout, StateUpdates } from './state.js';
import { Bool } from '../../provable/bool.js';
import { Field } from '../../provable/field.js';
import { Int64 } from '../../provable/int.js';
import { Proof } from '../../proof-system/zkprogram.js';
import { TokenSymbol } from '../../provable/crypto/poseidon.js';
import { PublicKey } from '../../provable/crypto/signature.js';
import { HashInput } from '../../provable/types/provable-derivers.js';
import { Provable } from '../../provable/types/provable-intf.js';
import * as Bindings from '../../../bindings/mina-transaction/v2/index.js';
import { NetworkId } from '../../../mina-signer/src/types.js';
import { VerificationKey } from '../../../lib/proof-system/verification-key.js';
export { AccountUpdate, Authorized, GenericData, AccountUpdateTree, AccountUpdateTreeDescription, ContextFreeAccountUpdateDescription, ContextFreeAccountUpdate, DynamicProvable, AccountUpdateCommitment, CommittedList, EventsHashConfig, ActionsHashConfig, };
declare const AccountUpdateCommitment_base: (new (value: {
    accountUpdateCommitment: Field;
}) => {
    accountUpdateCommitment: Field;
}) & {
    _isStruct: true;
} & Omit<Provable<{
    accountUpdateCommitment: Field;
}, {
    accountUpdateCommitment: bigint;
}>, "fromFields"> & {
    fromFields: (fields: Field[]) => {
        accountUpdateCommitment: Field;
    };
} & {
    fromValue: (value: {
        accountUpdateCommitment: string | number | bigint | Field;
    }) => {
        accountUpdateCommitment: Field;
    };
    toInput: (x: {
        accountUpdateCommitment: Field;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        accountUpdateCommitment: Field;
    }) => {
        accountUpdateCommitment: string;
    };
    fromJSON: (x: {
        accountUpdateCommitment: string;
    }) => {
        accountUpdateCommitment: Field;
    };
    empty: () => {
        accountUpdateCommitment: Field;
    };
};
declare class AccountUpdateCommitment extends AccountUpdateCommitment_base {
    constructor(accountUpdateCommitment: Field);
}
type DynamicProvable<T> = Provable<T> | {
    toFields(x: T): Field[];
    toAuxiliary(x: T): any[];
    fromFieldsDynamic(fields: Field[], aux: any[]): {
        value: T;
        fieldsConsumed: number;
    };
};
declare const GenericData: DynamicProvable<Field[]>;
interface HashableDataConfig<Item> {
    readonly emptyPrefix: string;
    readonly consPrefix: string;
    hash(item: Item): Field;
}
declare function EventsHashConfig<T>(T: DynamicProvable<T>): HashableDataConfig<T>;
declare function ActionsHashConfig<T>(T: DynamicProvable<T>): HashableDataConfig<T>;
declare class CommittedList<Item> {
    readonly Item: DynamicProvable<Item>;
    readonly data: Item[];
    readonly hash: Field;
    constructor({ Item, data, hash }: {
        Item: DynamicProvable<Item>;
        data: Item[];
        hash: Field;
    });
    toInternalRepr(): {
        data: Field[][];
        hash: Field;
    };
    mapUnsafe<B>(NewItem: DynamicProvable<B>, f: (a: Item) => B): CommittedList<B>;
    static hashList<Item>(config: HashableDataConfig<Item>, items: Item[]): Field;
    static from<Item>(Item: DynamicProvable<Item>, config: HashableDataConfig<Item>, value: undefined | Item[] | CommittedList<Item> | Bindings.Leaves.CommittedList): CommittedList<Item>;
}
interface MayUseToken {
    parentsOwnToken: Bool;
    inheritFromParent: Bool;
}
type AccountUpdateTreeDescription<RootDescription, Child> = RootDescription & {
    children?: AccountUpdateTree<Child>[];
};
declare class AccountUpdateTree<Root, Child = Root> {
    rootAccountUpdate: Root;
    children: AccountUpdateTree<Child, Child>[];
    constructor(rootAccountUpdate: Root, children: AccountUpdateTree<Child, Child>[]);
    static forEachNode<T>(tree: AccountUpdateTree<T>, depth: number, f: (accountUpdate: T, depth: number) => void): void;
    static forEachNodeInverted<T>(tree: AccountUpdateTree<T>, depth: number, f: (accountUpdate: T, depth: number) => void): void;
    static reduce<T, R>(tree: AccountUpdateTree<T>, f: (accountUpdate: T, childValues: R[]) => R): R;
    static mapRoot<RootIn, RootOut, Child>(tree: AccountUpdateTree<RootIn, Child>, f: (accountUpdate: RootIn) => RootOut): AccountUpdateTree<RootOut, Child>;
    static map<A, B>(tree: AccountUpdateTree<A>, f: (accountUpdate: A) => Promise<B>): Promise<AccountUpdateTree<B>>;
    static mapForest<A, B>(forest: AccountUpdateTree<A>[], f: (a: A) => Promise<B>): Promise<AccountUpdateTree<B>[]>;
    static hash(tree: AccountUpdateTree<AccountUpdate>, networkId: NetworkId): bigint;
    static hashForest(networkId: NetworkId, forest: AccountUpdateTree<AccountUpdate>[]): bigint;
    static unrollForest<AccountUpdateType, Return>(forest: AccountUpdateTree<AccountUpdateType>[], f: (accountUpdate: AccountUpdateType, depth: number) => Return): Return[];
    static sizeInFields(): number;
    static toFields(x: AccountUpdateTree<AccountUpdate>): Field[];
    static toAuxiliary(x?: AccountUpdateTree<AccountUpdate>): any[];
    static fromFields(fields: Field[], aux: any[]): AccountUpdateTree<AccountUpdate>;
    static toValue(x: AccountUpdateTree<AccountUpdate>): AccountUpdateTree<AccountUpdate>;
    static fromValue(x: AccountUpdateTree<AccountUpdate>): AccountUpdateTree<AccountUpdate>;
    static check(_x: AccountUpdateTree<AccountUpdate>): void;
    static from<RootDescription, Root, Child>(descr: AccountUpdateTreeDescription<RootDescription, Child>, createAccountUpdate: (descr: RootDescription) => Root): AccountUpdateTree<Root, Child>;
}
interface ContextFreeAccountUpdateDescription<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]> {
    authorizationKind: AccountUpdateAuthorizationKindIdentifier | AccountUpdateAuthorizationKind;
    preconditions?: PreconditionsDescription<State> | Preconditions<State>;
    balanceChange?: Int64;
    incrementNonce?: Bool;
    useFullCommitment?: Bool;
    implicitAccountCreationFee?: Bool;
    mayUseToken?: MayUseToken;
    pushEvents?: Event[] | CommittedList<Event>;
    pushActions?: Action[] | CommittedList<Action>;
    setState?: StateUpdates<State>;
    setPermissions?: PermissionsDescription | Permissions | Update<Permissions>;
    setDelegate?: PublicKey | Update<PublicKey>;
    setVerificationKey?: VerificationKey | Update<VerificationKey>;
    setZkappUri?: string | ZkappUri | Update<ZkappUri>;
    setTokenSymbol?: string | TokenSymbol | Update<TokenSymbol>;
    setTiming?: AccountTiming | Update<AccountTiming>;
    setVotingFor?: Field | Update<Field>;
}
declare class ContextFreeAccountUpdate<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]> {
    readonly State: StateDefinition<State>;
    authorizationKind: AccountUpdateAuthorizationKind;
    preconditions: Preconditions<State>;
    balanceChange: Int64;
    incrementNonce: Bool;
    useFullCommitment: Bool;
    implicitAccountCreationFee: Bool;
    mayUseToken: MayUseToken;
    pushEvents: CommittedList<Event>;
    pushActions: CommittedList<Action>;
    stateUpdates: StateUpdates<State>;
    permissionsUpdate: Update<Permissions>;
    delegateUpdate: Update<PublicKey>;
    verificationKeyUpdate: Update<VerificationKey>;
    zkappUriUpdate: Update<ZkappUri>;
    tokenSymbolUpdate: Update<TokenSymbol>;
    timingUpdate: Update<AccountTiming>;
    votingForUpdate: Update<Field>;
    constructor(State: StateDefinition<State>, Event: DynamicProvable<Event>, Action: DynamicProvable<Action>, descr: ContextFreeAccountUpdateDescription<State, Event, Action> | ContextFreeAccountUpdate<State, Event, Action>);
    toGeneric(): ContextFreeAccountUpdate;
    static fromGeneric<State extends StateLayout, Event, Action>(x: ContextFreeAccountUpdate, State: StateDefinition<State>, Event: DynamicProvable<Event>, Action: DynamicProvable<Action>): ContextFreeAccountUpdate<State, Event, Action>;
    static generic(descr: ContextFreeAccountUpdateDescription): ContextFreeAccountUpdate;
    static emptyPoly<State extends StateLayout, Event, Action>(State: StateDefinition<State>, Event: DynamicProvable<Event>, Action: DynamicProvable<Action>): ContextFreeAccountUpdate<State, Event, Action>;
    static empty(): ContextFreeAccountUpdate;
    static from<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(State: StateDefinition<State>, Event: DynamicProvable<Event>, Action: DynamicProvable<Action>, x: ContextFreeAccountUpdateDescription<State, Event, Action> | ContextFreeAccountUpdate<State, Event, Action> | undefined): ContextFreeAccountUpdate<State, Event, Action>;
}
type AccountUpdateDescription<State extends StateLayout, Event = Field[], Action = Field[]> = ({
    update: ContextFreeAccountUpdate<State, Event, Action>;
    proof?: Proof<undefined, AccountUpdateCommitment>;
} | ContextFreeAccountUpdateDescription<State, Event, Action>) & {
    accountId: AccountId;
    verificationKeyHash?: Field;
    callData?: Field;
};
declare class AccountUpdate<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]> extends ContextFreeAccountUpdate<State, Event, Action> {
    accountId: AccountId;
    verificationKeyHash: Field;
    callData: Field;
    proof: 'NoProofRequired' | 'ProofPending' | Proof<undefined, AccountUpdateCommitment>;
    constructor(State: StateDefinition<State>, Event: DynamicProvable<Event>, Action: DynamicProvable<Action>, descr: AccountUpdateDescription<State, Event, Action>);
    get authorizationKindWithZkappContext(): AccountUpdateAuthorizationKindWithZkappContext;
    toInternalRepr(callDepth: number): Bindings.Layout.AccountUpdateBody;
    toInput(): HashInput;
    commit(networkId: NetworkId): AccountUpdateCommitment;
    toGeneric(): AccountUpdate;
    static fromGeneric<State extends StateLayout, Event, Action>(x: AccountUpdate, State: StateDefinition<State>, Event: DynamicProvable<Event>, Action: DynamicProvable<Action>): AccountUpdate<State, Event, Action>;
    authorize(authEnv: AccountUpdateAuthorizationEnvironment): Promise<Authorized<State, Event, Action>>;
    static create(x: AccountUpdateDescription<'GenericState', Field[], Field[]>): AccountUpdate;
    static fromInternalRepr(x: Bindings.Layout.AccountUpdateBody): AccountUpdate;
    static sizeInFields(): number;
    static toFields(x: AccountUpdate): Field[];
    static toAuxiliary(x?: AccountUpdate, callDepth?: number): any[];
    static fromFields(fields: Field[], aux: any[]): AccountUpdate;
    static toValue(x: AccountUpdate): AccountUpdate;
    static fromValue(x: AccountUpdate): AccountUpdate;
    static check(_x: AccountUpdate): void;
    static empty(): AccountUpdate;
}
declare class Authorized<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]> {
    authorization: AccountUpdateAuthorization;
    private update;
    constructor(authorization: AccountUpdateAuthorization, update: AccountUpdate<State, Event, Action>);
    toAccountUpdate(): AccountUpdate<State, Event, Action>;
    get State(): StateDefinition<State>;
    get authorizationKind(): AccountUpdateAuthorizationKind;
    get accountId(): AccountId;
    get verificationKeyHash(): Field;
    get callData(): Field;
    get preconditions(): Preconditions<State>;
    get balanceChange(): Int64;
    get incrementNonce(): Bool;
    get useFullCommitment(): Bool;
    get implicitAccountCreationFee(): Bool;
    get mayUseToken(): MayUseToken;
    get pushEvents(): CommittedList<Event>;
    get pushActions(): CommittedList<Action>;
    get stateUpdates(): StateUpdates<State>;
    get permissionsUpdate(): Update<Permissions>;
    get delegateUpdate(): Update<PublicKey>;
    get verificationKeyUpdate(): Update<VerificationKey>;
    get zkappUriUpdate(): Update<ZkappUri>;
    get tokenSymbolUpdate(): Update<TokenSymbol>;
    get timingUpdate(): Update<AccountTiming>;
    get votingForUpdate(): Update<Field>;
    get authorizationKindWithZkappContext(): AccountUpdateAuthorizationKindWithZkappContext;
    hash(netId: NetworkId): Field;
    toInternalRepr(callDepth: number): Bindings.Layout.ZkappAccountUpdate;
    static fromInternalRepr(x: Bindings.Layout.ZkappAccountUpdate): Authorized;
    toJSON(callDepth: number): any;
    toInput(): HashInput;
    toFields(): Field[];
    static empty(): Authorized;
    static sizeInFields(): number;
    static toJSON<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(x: Authorized<State, Event, Action>, callDepth: number): any;
    static toInput<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(x: Authorized<State, Event, Action>): HashInput;
    static toFields<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(x: Authorized<State, Event, Action>): Field[];
    static toAuxiliary<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(x?: Authorized<State, Event, Action>, callDepth?: number): any[];
    static fromFields(fields: Field[], aux: any[]): Authorized;
    static toValue<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(x: Authorized<State, Event, Action>): Authorized<State, Event, Action>;
    static fromValue<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(x: Authorized<State, Event, Action>): Authorized<State, Event, Action>;
    static check<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]>(_x: Authorized<State, Event, Action>): void;
}
