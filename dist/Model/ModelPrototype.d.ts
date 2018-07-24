export declare type Diff<T extends string, U extends string> = ({
    [P in T]: P;
} & {
    [P in U]: never;
} & {
    [x: string]: never;
})[T];
export interface ModelPrototype<MODEL extends object, EXTENDED extends object = {}, OVERRIDDEN extends keyof MODEL = never> {
    PROTOTYPE: Pick<MODEL, Diff<keyof MODEL, keyof EXTENDED> | OVERRIDDEN>;
}
