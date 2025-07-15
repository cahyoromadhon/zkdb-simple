import { Account, AccountId } from './account.js';
import { Field } from '../../provable/field.js';
import { UInt32, UInt64 } from '../../provable/int.js';
import { MinaAmount } from './currency.js';
export { ChainView, EpochData, EpochLedgerData, LedgerView, LocalChain, LocalLedger };
interface ChainView {
    snarkedLedgerHash: Field;
    blockchainLength: UInt32;
    minWindowDensity: UInt32;
    totalCurrency: MinaAmount;
    globalSlotSinceGenesis: UInt32;
    stakingEpochData: EpochData;
    nextEpochData: EpochData;
}
interface EpochData {
    ledger: EpochLedgerData;
    seed: Field;
    startCheckpoint: Field;
    lockCheckpoint: Field;
    epochLength: UInt32;
}
interface EpochLedgerData {
    hash: Field;
    totalCurrency: MinaAmount;
}
interface LedgerView {
    hasAccount(accountId: AccountId): boolean;
    getAccount(accountId: AccountId): Account | null;
    setAccount(account: Account): void;
    updateAccount(accountId: AccountId, f: (account: Account) => Account): void;
}
declare class LocalChain implements ChainView {
    snarkedLedgerHash: Field;
    blockchainLength: UInt32;
    minWindowDensity: UInt32;
    totalCurrency: UInt64;
    globalSlotSinceGenesis: UInt32;
    stakingEpochData: EpochData;
    nextEpochData: EpochData;
    constructor(snarkedLedgerHash: Field, blockchainLength: UInt32, minWindowDensity: UInt32, totalCurrency: UInt64, globalSlotSinceGenesis: UInt32, stakingEpochData: EpochData, nextEpochData: EpochData);
    static initial(): LocalChain;
}
declare class LocalLedger implements LedgerView {
    private accounts;
    constructor(accounts: Account[]);
    hasAccount(accountId: AccountId): boolean;
    getAccount(accountId: AccountId): Account | null;
    setAccount(account: Account): void;
    updateAccount(accountId: AccountId, f: (account: Account) => Account): void;
}
