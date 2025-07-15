import { Context } from '../../util/global-context.js';
import { Gate, GateType, JsonGate } from '../../../bindings.js';
export { snarkContext, SnarkContext, asProver, synchronousRunners, generateWitness, constraintSystem, inProver, inAnalyze, inCheckedComputation, inCompile, inCompileMode, gatesFromJson, printGates, summarizeGates, MlConstraintSystem, ConstraintSystemSummary, };
type ConstraintSystemSummary = {
    /**
     * Number of rows in the constraint system
     */
    rows: number;
    digest: string;
    /**
     * List of gates which make up the constraint system
     */
    gates: Gate[];
    publicInputSize: number;
    print(): void;
    summary(): Record<string, number>;
};
type SnarkContext = {
    witnesses?: unknown[];
    proverData?: any;
    inProver?: boolean;
    inCompile?: boolean;
    inCheckedComputation?: boolean;
    inAnalyze?: boolean;
    inWitnessBlock?: boolean;
    auxInputData?: any[];
};
declare let snarkContext: Context.t<SnarkContext>;
declare class MlConstraintSystem {
}
declare function inProver(): boolean;
declare function inCheckedComputation(): boolean;
declare function inCompile(): boolean;
declare function inAnalyze(): boolean;
declare function inCompileMode(): boolean;
declare function asProver(f: () => void): void;
declare function generateWitness(f: (() => Promise<void>) | (() => void), { checkConstraints }?: {
    checkConstraints?: boolean | undefined;
}): Promise<[_: 0, public_inputs: import("../../../bindings/crypto/bindings/vector.js").FieldVector, auxiliary_inputs: import("../../../bindings/crypto/bindings/vector.js").FieldVector]>;
declare function constraintSystem(f: (() => Promise<void>) | (() => void)): Promise<ConstraintSystemSummary>;
/**
 * helpers to run circuits in synchronous tests
 */
declare function synchronousRunners(): Promise<{
    runAndCheckSync: (f: () => void) => void;
    constraintSystemSync: (f: () => void) => ConstraintSystemSummary;
}>;
declare function gatesFromJson(cs: {
    gates: JsonGate[];
    public_input_size: number;
}): {
    publicInputSize: number;
    gates: Gate[];
};
declare function summarizeGates(gates: Gate[]): Partial<Record<GateType | "Total rows", number>>;
declare function printGates(gates: Gate[]): void;
