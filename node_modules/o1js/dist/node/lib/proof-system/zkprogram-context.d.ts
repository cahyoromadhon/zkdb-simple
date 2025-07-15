import type { Subclass } from '../util/types.js';
import type { ProofBase } from './proof.js';
export { ZkProgramContext, DeclaredProof };
type DeclaredProof = {
    ProofClass: Subclass<typeof ProofBase<any, any>>;
    proofInstance: ProofBase<any, any>;
};
type ZkProgramContext = {
    proofs: DeclaredProof[];
};
declare const ZkProgramContext: {
    enter(): number;
    leave: (id: number) => ZkProgramContext;
    has: () => boolean;
    declareProof(proof: DeclaredProof): void;
    getDeclaredProofs(): DeclaredProof[];
};
