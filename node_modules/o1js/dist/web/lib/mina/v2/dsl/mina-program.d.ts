import { AccountUpdate, AccountUpdateTree, AccountUpdateTreeDescription, ContextFreeAccountUpdateDescription, ContextFreeAccountUpdate, DynamicProvable } from '../account-update.js';
import { Account, AccountId } from '../account.js';
import { ProvableTuple, ProvableTupleInstances } from '../core.js';
import { StateDefinition, StateLayout, StateReader } from '../state.js';
import { ZkappCommandContext } from '../transaction.js';
import { Cache } from '../../../proof-system/cache.js';
import { Bool } from '../../../provable/bool.js';
import { Field } from '../../../provable/field.js';
import { UInt32 } from '../../../provable/int.js';
import { PublicKey } from '../../../provable/crypto/signature.js';
import { Unconstrained } from '../../../provable/types/unconstrained.js';
import { VerificationKey } from '../../../proof-system/verification-key.js';
import { MinaAmount } from '../currency.js';
export { MinaProgramEnv, MinaProgramMethodReturn, MinaProgramMethodImpl, MinaProgramMethodProver, MinaProgramDescription, MinaProgram, };
declare class MinaProgramEnv<State extends StateLayout> {
    State: StateDefinition<State>;
    private account;
    private verificationKey;
    private expectedPreconditions;
    constructor(State: StateDefinition<State>, account: Unconstrained<Account<State>>, verificationKey: Unconstrained<VerificationKey>);
    get accountId(): AccountId;
    get accountVerificationKeyHash(): Field;
    get programVerificationKey(): VerificationKey;
    get balance(): MinaAmount;
    get nonce(): UInt32;
    get receiptChainHash(): Field;
    get delegate(): PublicKey;
    get state(): StateReader<State>;
    get actionState(): Field;
    get isProven(): Bool;
    static sizeInFields(): number;
    static toFields<State extends StateLayout>(_x: MinaProgramEnv<State>): Field[];
    static toAuxiliary<State extends StateLayout>(x?: MinaProgramEnv<State>): any[];
    static fromFields(_fields: Field[], aux: any[]): MinaProgramEnv<'GenericState'>;
    static toValue<State extends StateLayout>(x: MinaProgramEnv<State>): MinaProgramEnv<State>;
    static fromValue<State extends StateLayout>(x: MinaProgramEnv<State>): MinaProgramEnv<State>;
    static check<State extends StateLayout>(_x: MinaProgramEnv<State>): void;
}
type MinaProgramMethodReturn<State extends StateLayout = 'GenericState', Event = Field[], Action = Field[]> = Omit<AccountUpdateTreeDescription<ContextFreeAccountUpdateDescription<State, Event, Action>, AccountUpdate>, 'authorizationKind'> | ContextFreeAccountUpdate<State, Event, Action>;
type MinaProgramMethodImpl<State extends StateLayout, Event, Action, PrivateInputs extends ProvableTuple> = {
    privateInputs: PrivateInputs;
    method(env: MinaProgramEnv<State>, ...args: ProvableTupleInstances<PrivateInputs>): Promise<MinaProgramMethodReturn<State, Event, Action>>;
};
type MinaProgramMethodProver<State extends StateLayout, Event, Action, PrivateInputs extends ProvableTuple> = (env: ZkappCommandContext, accountId: AccountId, ...args: ProvableTupleInstances<PrivateInputs>) => Promise<AccountUpdateTree<AccountUpdate<State, Event, Action>, AccountUpdate>>;
interface MinaProgramDescription<State extends StateLayout, Event, Action, MethodPrivateInputs extends {
    [key: string]: ProvableTuple;
}> {
    name: string;
    State: StateDefinition<State>;
    Event: DynamicProvable<Event>;
    Action: DynamicProvable<Action>;
    methods: {
        [key in keyof MethodPrivateInputs]: MinaProgramMethodImpl<State, Event, Action, MethodPrivateInputs[key]>;
    };
}
type MinaProgram<State extends StateLayout, Event, Action, MethodPrivateInputs extends {
    [key: string]: ProvableTuple;
}> = {
    name: string;
    State: StateDefinition<State>;
    Event: DynamicProvable<Event>;
    Action: DynamicProvable<Action>;
    compile(options?: {
        cache?: Cache;
        forceRecompile?: boolean;
    }): Promise<{
        verificationKey: {
            data: string;
            hash: Field;
        };
    }>;
} & {
    [key in keyof MethodPrivateInputs]: MinaProgramMethodProver<State, Event, Action, MethodPrivateInputs[key]>;
};
declare function MinaProgram<State extends StateLayout, Event, Action, MethodPrivateInputs extends {
    [key: string]: ProvableTuple;
}>(descr: MinaProgramDescription<State, Event, Action, MethodPrivateInputs>): MinaProgram<State, Event, Action, MethodPrivateInputs>;
