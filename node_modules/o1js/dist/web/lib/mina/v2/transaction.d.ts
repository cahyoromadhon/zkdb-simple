import { ZkappCommandAuthorizationEnvironment, ZkappFeePaymentAuthorizationEnvironment } from './authorization.js';
import { AccountUpdate, AccountUpdateTree, Authorized } from './account-update.js';
import { AccountIdSet } from './account.js';
import { AccountUpdateErrorTrace } from './errors.js';
import { StateLayout } from './state.js';
import { ChainView, LedgerView } from './views.js';
import { ApplyState } from './zkapp-logic.js';
import { Int64, UInt32, UInt64 } from '../../provable/int.js';
import { PublicKey } from '../../provable/crypto/signature.js';
import * as BindingsLayout from '../../../bindings/mina-transaction/gen/v2/js-layout.js';
import { NetworkId } from '../../../mina-signer/src/types.js';
export { ZkappCommand, ZkappFeePayment, ZkappCommandContext, AuthorizedZkappCommand, createZkappCommand, };
interface ZkappFeePaymentDescription {
    publicKey: PublicKey;
    fee: UInt64;
    validUntil?: UInt32;
    nonce: UInt32;
}
declare class ZkappFeePayment {
    readonly __type: 'ZkappCommand';
    publicKey: PublicKey;
    fee: UInt64;
    validUntil: UInt32 | undefined;
    nonce: UInt32;
    constructor(descr: ZkappFeePaymentDescription);
    authorize({ networkId, privateKey, fullTransactionCommitment, }: ZkappFeePaymentAuthorizationEnvironment): AuthorizedZkappFeePayment;
    toAccountUpdate(): AccountUpdate;
    toDummyAuthorizedAccountUpdate(): Authorized;
    toInternalRepr(): BindingsLayout.FeePayerBody;
    toJSON(): any;
    static toJSON(x: ZkappFeePayment): any;
}
declare class AuthorizedZkappFeePayment {
    readonly body: ZkappFeePayment;
    readonly signature: string;
    constructor(body: ZkappFeePayment, signature: string);
    toInternalRepr(): BindingsLayout.ZkappFeePayer;
}
interface ZkappCommandDescription {
    feePayment: ZkappFeePayment;
    accountUpdates: (AccountUpdate | AccountUpdateTree<AccountUpdate>)[];
    memo?: string;
}
declare class ZkappCommand {
    readonly __type: 'ZkappCommand';
    feePayment: ZkappFeePayment;
    accountUpdateForest: AccountUpdateTree<AccountUpdate>[];
    memo: string;
    constructor(descr: ZkappCommandDescription);
    commitments(networkId: NetworkId): {
        accountUpdateForestCommitment: bigint;
        fullTransactionCommitment: bigint;
    };
    authorize(authEnv: ZkappCommandAuthorizationEnvironment): Promise<AuthorizedZkappCommand>;
}
declare class AuthorizedZkappCommand {
    readonly __type: 'AuthorizedZkappCommand';
    readonly feePayment: AuthorizedZkappFeePayment;
    readonly accountUpdateForest: AccountUpdateTree<Authorized>[];
    readonly memo: string;
    constructor({ feePayment, accountUpdateForest, memo, }: {
        feePayment: AuthorizedZkappFeePayment;
        accountUpdateForest: AccountUpdateTree<Authorized>[];
        memo: string;
    });
    toInternalRepr(): BindingsLayout.ZkappCommand;
    toJSON(): any;
    static toJSON(x: AuthorizedZkappCommand): any;
}
declare class ZkappCommandContext {
    ledger: LedgerView;
    chain: ChainView;
    failedAccounts: AccountIdSet;
    globalSlot: UInt32;
    feeExcessState: ApplyState<Int64>;
    private accountUpdateForest;
    private accountUpdateForestTrace;
    constructor(ledger: LedgerView, chain: ChainView, failedAccounts: AccountIdSet, globalSlot: UInt32);
    add<State extends StateLayout>(x: AccountUpdate<State, any, any> | AccountUpdateTree<AccountUpdate<State, any, any>, AccountUpdate>): void;
    unsafeAddWithoutApplying<State extends StateLayout>(x: AccountUpdate<State, any, any> | AccountUpdateTree<AccountUpdate<State, any, any>, AccountUpdate>, trace: AccountUpdateErrorTrace): void;
    finalize(): {
        accountUpdateForest: AccountUpdateTree<AccountUpdate>[];
        accountUpdateForestTrace: AccountUpdateErrorTrace[];
        generalErrors: Error[];
    };
}
declare function createZkappCommand(ledger: LedgerView, chain: ChainView, authEnv: ZkappCommandAuthorizationEnvironment, feePayment: {
    feePayer: PublicKey;
    fee: UInt64;
    validUntil?: UInt32;
}, f: (ctx: ZkappCommandContext) => Promise<void>): Promise<AuthorizedZkappCommand>;
