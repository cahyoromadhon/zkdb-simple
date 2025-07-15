import { Empty, Eq, ProvableInstance, Update } from './core.js';
import { Precondition } from './preconditions.js';
import { Bool } from '../../provable/bool.js';
import { Field } from '../../provable/field.js';
import { Provable } from '../../provable/provable.js';
import { Unconstrained } from '../../provable/types/unconstrained.js';
export { StateValues, GenericStatePreconditions, StatePreconditions, StateDefinition, StateUpdates, StateLayout, GenericStateUpdates, StateMask, StateReader, State, };
type CustomStateLayout = {
    [name: string]: Provable<any> & Empty<any>;
};
type StateLayout = 'GenericState' | CustomStateLayout;
declare const CustomStateLayout: {
    project<StateIn extends CustomStateLayout, StateOut extends { [name in keyof StateIn]: unknown; }>(Layout: StateIn, f: (key: keyof StateIn, value: StateIn[keyof StateIn]) => StateOut[keyof StateIn]): StateOut;
};
type StateDefinition<State extends StateLayout> = State extends 'GenericState' ? 'GenericState' : {
    Layout: State;
} & Provable<{
    [name in keyof State]: ProvableInstance<State[name]>;
}>;
declare const StateDefinition: {
    split2<State extends StateLayout, Generic1, Custom1, Generic2, Custom2>(definition: StateDefinition<State>, value1: State extends 'GenericState' ? Generic1 : Custom1, value2: State extends 'GenericState' ? Generic2 : Custom2, generic: (x1: Generic1, x2: Generic2) => void, custom: (layout: CustomStateLayout, x1: Custom1, x2: Custom2) => void): void;
    map<State_1 extends StateLayout, GenericIn, CustomIn, GenericOut, CustomOut>(definition: StateDefinition<State_1>, value: State_1 extends "GenericState" ? GenericIn : CustomIn, generic: (x: GenericIn) => GenericOut, custom: (layout: CustomStateLayout, x: CustomIn) => CustomOut): State_1 extends "GenericState" ? GenericOut : CustomOut;
    map2<State_2 extends StateLayout, GenericIn1, CustomIn1, GenericIn2, CustomIn2, GenericOut_1, CustomOut_1>(definition: StateDefinition<State_2>, value1: State_2 extends "GenericState" ? GenericIn1 : CustomIn1, value2: State_2 extends "GenericState" ? GenericIn2 : CustomIn2, generic: (x1: GenericIn1, x2: GenericIn2) => GenericOut_1, custom: (layout: CustomStateLayout, x1: CustomIn1, x2: CustomIn2) => CustomOut_1): State_2 extends "GenericState" ? GenericOut_1 : CustomOut_1;
    project<State_3 extends StateLayout, Generic, Custom>(definition: StateDefinition<State_3>, generic: () => Generic, custom: (layout: CustomStateLayout) => Custom): State_3 extends "GenericState" ? Generic : Custom;
    convert<State_4 extends StateLayout, Generic_1, Custom_1, Out>(definition: StateDefinition<State_4>, value: State_4 extends "GenericState" ? Generic_1 : Custom_1, generic: (x: Generic_1) => Out, custom: (layout: CustomStateLayout, x: Custom_1) => Out): Out;
};
declare function State<State extends CustomStateLayout>(Layout: State): StateDefinition<State>;
type StatePreconditions<State extends StateLayout> = State extends 'GenericState' ? GenericStatePreconditions : {
    [name in keyof State]: Precondition.Equals<ProvableInstance<State[name]> & Eq<ProvableInstance<State[name]>>>;
};
declare const StatePreconditions: {
    empty<State extends StateLayout>(State: StateDefinition<State>): StatePreconditions<State>;
    toGeneric<State_1 extends StateLayout>(State: StateDefinition<State_1>, statePreconditions: StatePreconditions<State_1>): StatePreconditions<'GenericState'>;
    fromGeneric<State_2 extends StateLayout>(statePreconditions: StatePreconditions<'GenericState'>, State: StateDefinition<State_2>): StatePreconditions<State_2>;
    toFieldPreconditions<State_3 extends StateLayout>(State: StateDefinition<State_3>, preconditions: StatePreconditions<State_3>): Precondition.Equals<Field>[];
};
type StateUpdates<State extends StateLayout> = State extends 'GenericState' ? GenericStateUpdates : {
    [name in keyof State]?: ProvableInstance<State[name]> | Update<ProvableInstance<State[name]>>;
};
declare const StateUpdates: {
    empty<State extends StateLayout>(State: StateDefinition<State>): StateUpdates<State>;
    anyValuesAreSet<State_1 extends StateLayout>(stateUpdates: StateUpdates<State_1>): Bool;
    toGeneric<State_2 extends StateLayout>(State: StateDefinition<State_2>, stateUpdates: StateUpdates<State_2>): StateUpdates<'GenericState'>;
    fromGeneric<State_3 extends StateLayout>(stateUpdates: StateUpdates<'GenericState'>, State: StateDefinition<State_3>): StateUpdates<State_3>;
    toFieldUpdates<State_4 extends StateLayout>(State: StateDefinition<State_4>, updates: StateUpdates<State_4>): Update<Field>[];
};
type StateValues<State extends StateLayout> = State extends 'GenericState' ? GenericStateValues : {
    [name in keyof State]: ProvableInstance<State[name]>;
};
declare const StateValues: {
    empty<State extends StateLayout>(State: StateDefinition<State>): StateValues<State>;
    toGeneric<State_1 extends StateLayout>(State: StateDefinition<State_1>, stateValues: StateValues<State_1>): StateValues<'GenericState'>;
    fromGeneric<State_2 extends StateLayout>(stateValues: StateValues<'GenericState'>, State: StateDefinition<State_2>): StateValues<State_2>;
    checkPreconditions<State_3 extends StateLayout>(State: StateDefinition<State_3>, stateValues: StateValues<State_3>, statePreconditions: StatePreconditions<State_3>): void;
    applyUpdates<State_4 extends StateLayout>(State: StateDefinition<State_4>, stateValues: StateValues<State_4>, stateUpdates: StateUpdates<State_4>): StateValues<State_4>;
};
type StateMask<State extends StateLayout> = State extends 'GenericState' ? GenericStateMask : {
    [name in keyof State]?: ProvableInstance<State[name]>;
};
declare const StateMask: {
    create<State extends StateLayout>(State: StateDefinition<State>): StateMask<State>;
};
type StateReader<State extends StateLayout> = State extends 'GenericState' ? GenericStateReader : {
    [name in keyof State]: State[name] extends Provable<infer U> ? () => U : never;
};
declare const StateReader: {
    create<State extends StateLayout>(State: StateDefinition<State>, stateValues: Unconstrained<StateValues<State>>, stateMask: Unconstrained<StateMask<State>>): StateReader<State>;
};
declare class StateFieldsArray<T> {
    private fieldElements;
    constructor(fieldElements: T[], empty: () => T);
    get fields(): T[];
}
declare class GenericStateValues extends StateFieldsArray<Field> {
    constructor(values: Field[]);
    get values(): Field[];
    get(index: number): Field;
    map(f: (x: Field, i: number) => Field): GenericStateValues;
    static empty(): GenericStateValues;
}
declare class GenericStatePreconditions extends StateFieldsArray<Precondition.Equals<Field>> {
    constructor(preconditions: Precondition.Equals<Field>[]);
    get preconditions(): Precondition.Equals<Field>[];
    static empty(): GenericStatePreconditions;
}
declare class GenericStateUpdates extends StateFieldsArray<Update<Field>> {
    constructor(updates: Update<Field>[]);
    get updates(): Update<Field>[];
    static empty(): GenericStateUpdates;
}
declare class GenericStateMask extends StateFieldsArray<Field | undefined> {
    constructor();
    set(index: number, value: Field): void;
    static empty(): GenericStateMask;
}
declare class GenericStateReader {
    private values;
    private mask;
    constructor(values: Unconstrained<GenericStateValues>, mask: Unconstrained<GenericStateMask>);
    read(index: number): Field;
}
