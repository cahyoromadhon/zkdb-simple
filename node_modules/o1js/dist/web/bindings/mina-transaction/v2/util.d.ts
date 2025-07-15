import { Field } from '../../../lib/provable/field.js';
import { Provable } from '../../../lib/provable/provable.js';
import { HashInput } from '../../../lib/provable/types/provable-derivers.js';
export type ProvableSerializable<T, Val = any> = Provable<T, Val> & {
    toJSON(x: T): any;
    toInput(x: T): HashInput;
};
export declare class FieldsDecoder {
    private fields;
    private index;
    constructor(fields: Field[], index?: number);
    decode<T>(size: number, f: (subFields: Field[]) => T): T;
}
