import { AccountId } from './account.js';
import StackTrace from 'stacktrace-js';
import StackFrame = StackTrace.StackFrame;
export declare function getCallerFrame(): StackFrame;
export declare class ZkappCommandErrorTrace {
    generalErrors: Error[];
    feePaymentErrors: Error[];
    accountUpdateForestTrace: AccountUpdateErrorTrace[];
    constructor(generalErrors: Error[], feePaymentErrors: Error[], accountUpdateForestTrace: AccountUpdateErrorTrace[]);
    hasErrors(): boolean;
    generateReport(): string;
}
export interface AccountUpdateErrorTrace {
    accountId: AccountId;
    callSite: StackFrame;
    errors: Error[];
    childTraces: AccountUpdateErrorTrace[];
}
