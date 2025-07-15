import { AccountUpdate } from './account-update.js';
import { Account } from './account.js';
import { StateLayout } from './state.js';
import { ZkappFeePayment } from './transaction.js';
import { ChainView } from './views.js';
import { Int64 } from '../../provable/int.js';
export { checkAndApplyAccountUpdate, checkAndApplyFeePayment, ApplyState };
type ApplyResult<T> = ({
    status: 'Applied';
} & T) | {
    status: 'Failed';
    errors: Error[];
};
type ApplyState<T> = {
    status: 'Alive';
    value: T;
} | {
    status: 'Dead';
};
declare function checkAndApplyAccountUpdate<State extends StateLayout, Event, Action>(chain: ChainView, account: Account<State>, update: AccountUpdate<State, Event, Action>, feeExcessState: ApplyState<Int64>): ApplyResult<{
    updatedFeeExcessState: ApplyState<Int64>;
    updatedAccount: Account<State>;
}>;
declare function checkAndApplyFeePayment(chain: ChainView, account: Account, feePayment: ZkappFeePayment): ApplyResult<{
    updatedAccount: Account;
}>;
