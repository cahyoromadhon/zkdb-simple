import { Bool } from '../../provable/bool.js';
import { Field } from '../../provable/field.js';
import { UInt32 } from '../../provable/int.js';
import { PrivateKey, PublicKey } from '../../provable/crypto/signature.js';
import { HashInput } from '../../provable/types/provable-derivers.js';
import * as Bindings from '../../../bindings/mina-transaction/v2/index.js';
import { NetworkId } from '../../../mina-signer/src/types.js';
export { AccountUpdateAuthorization, AccountUpdateAuthorizationEnvironment, AccountUpdateAuthorizationKind, AccountUpdateAuthorizationKindIdentifier, AccountUpdateAuthorizationKindWithZkappContext, AuthorizationLevelIdentifier, VerificationKeyAuthorizationLevel, ZkappFeePaymentAuthorizationEnvironment, ZkappCommandAuthorizationEnvironment, };
type AuthorizationLevelIdentifier = Bindings.Leaves.AuthRequiredIdentifier;
export declare class AuthorizationLevel {
    constant: Bool;
    signatureNecessary: Bool;
    signatureSufficient: Bool;
    constructor({ constant, signatureNecessary, signatureSufficient, }: {
        constant: Bool;
        signatureNecessary: Bool;
        signatureSufficient: Bool;
    });
    toInternalRepr(): Bindings.Leaves.AuthRequired;
    static fromInternalRepr(x: Bindings.Leaves.AuthRequired): AuthorizationLevel;
    toJSON(): any;
    toInput(): HashInput;
    toFields(): Field[];
    isImpossible(): Bool;
    isNone(): Bool;
    isProof(): Bool;
    isSignature(): Bool;
    isProofOrSignature(): Bool;
    requiresProof(): Bool;
    requiresSignature(): Bool;
    isSatisfied(authKind: AccountUpdateAuthorizationKind): Bool;
    identifier(): AuthorizationLevelIdentifier;
    static Impossible(): AuthorizationLevel;
    static None(): AuthorizationLevel;
    static Proof(): AuthorizationLevel;
    static Signature(): AuthorizationLevel;
    static ProofOrSignature(): AuthorizationLevel;
    static sizeInFields(): number;
    static empty(): AuthorizationLevel;
    static toJSON(x: AuthorizationLevel): any;
    static toInput(x: AuthorizationLevel): HashInput;
    static toFields(x: AuthorizationLevel): Field[];
    static toAuxiliary(x?: AuthorizationLevel): any[];
    static fromFields(fields: Field[], aux: any[]): AuthorizationLevel;
    static check(x: AuthorizationLevel): void;
    static toValue(x: AuthorizationLevel): AuthorizationLevel;
    static fromValue(x: AuthorizationLevel): AuthorizationLevel;
    static from(x: AuthorizationLevelIdentifier | AuthorizationLevel): AuthorizationLevel;
}
declare class VerificationKeyAuthorizationLevel {
    auth: AuthorizationLevel;
    txnVersion: UInt32;
    constructor(auth: AuthorizationLevel, txnVersion?: UInt32);
    toJSON(): {
        auth: AuthorizationLevelIdentifier;
        txnVersion: string;
    };
    static sizeInFields(): number;
    static empty(): VerificationKeyAuthorizationLevel;
    static toFields(_x: VerificationKeyAuthorizationLevel): Field[];
    static toAuxiliary(_x?: VerificationKeyAuthorizationLevel): any[];
    static fromFields(_fields: Field[], _aux: any[]): VerificationKeyAuthorizationLevel;
    static check(_x: VerificationKeyAuthorizationLevel): void;
    static toValue(x: VerificationKeyAuthorizationLevel): VerificationKeyAuthorizationLevel;
    static fromValue(x: VerificationKeyAuthorizationLevel): VerificationKeyAuthorizationLevel;
    static from(x: AuthorizationLevelIdentifier | AuthorizationLevel | VerificationKeyAuthorizationLevel): VerificationKeyAuthorizationLevel;
}
interface AccountUpdateAuthorization {
    proof: string | null;
    signature: string | null;
}
type AccountUpdateAuthorizationKindIdentifier = 'None' | 'Signature' | 'Proof' | 'SignatureAndProof';
declare class AccountUpdateAuthorizationKind {
    isSigned: Bool;
    isProved: Bool;
    constructor({ isSigned, isProved }: {
        isSigned: Bool;
        isProved: Bool;
    });
    identifier(): AccountUpdateAuthorizationKindIdentifier;
    static from(x: AccountUpdateAuthorizationKindIdentifier | AccountUpdateAuthorizationKind): AccountUpdateAuthorizationKind;
    static None(): AccountUpdateAuthorizationKind;
    static Signature(): AccountUpdateAuthorizationKind;
    static Proof(): AccountUpdateAuthorizationKind;
    static SignatureAndProof(): AccountUpdateAuthorizationKind;
}
declare class AccountUpdateAuthorizationKindWithZkappContext {
    isSigned: Bool;
    isProved: Bool;
    verificationKeyHash: Field;
    constructor(kind: AccountUpdateAuthorizationKind, verificationKeyHash: Field);
    toJSON(): any;
}
type AccountUpdateAuthorizationEnvironment = ZkappCommandAuthorizationEnvironment & {
    accountUpdateForestCommitment: bigint;
    fullTransactionCommitment?: bigint;
};
interface ZkappFeePaymentAuthorizationEnvironment {
    networkId: NetworkId;
    privateKey: PrivateKey;
    fullTransactionCommitment: bigint;
}
interface ZkappCommandAuthorizationEnvironment {
    networkId: NetworkId;
    getPrivateKey(publicKey: PublicKey): Promise<PrivateKey>;
}
