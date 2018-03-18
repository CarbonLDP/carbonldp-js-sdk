import { Serializer } from "./../Serializer";
export declare class DateSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let dateSerializer: DateSerializer;
export declare class DateTimeSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let dateTimeSerializer: DateTimeSerializer;
export declare class TimeSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let timeSerializer: TimeSerializer;
export declare class IntegerSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let integerSerializer: IntegerSerializer;
export declare class LongSerializer implements Serializer {
    serialize(value: any): string;
}
export declare const longSerializer: LongSerializer;
export declare class UnsignedIntegerSerializer extends IntegerSerializer {
    serialize(value: any): string;
}
export declare let unsignedIntegerSerializer: UnsignedIntegerSerializer;
export declare class UnsignedLongSerializer implements Serializer {
    serialize(value: any): string;
}
export declare const unsignedLongSerializer: UnsignedLongSerializer;
export declare class FloatSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let floatSerializer: FloatSerializer;
export declare class BooleanSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let booleanSerializer: BooleanSerializer;
export declare class StringSerializer implements Serializer {
    serialize(value: any): string;
}
export declare let stringSerializer: StringSerializer;
