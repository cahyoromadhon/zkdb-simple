import { Int64, UInt64 } from '../../provable/int.js';
export { MinaAmount, BalanceChange };
type MinaAmount = UInt64;
declare const MinaAmount: {
    fromMINA: (amount: bigint | number) => MinaAmount;
    toMINA: (amount: MinaAmount) => bigint;
    fromNanoMINA: (amount: bigint) => MinaAmount;
    toNanoMINA: (amount: MinaAmount) => bigint;
};
type BalanceChange = Int64;
declare const BalanceChange: {
    positive: {
        fromMINA: (amount: bigint) => BalanceChange;
    };
    negative: {
        fromMINA: (amount: bigint) => BalanceChange;
    };
};
