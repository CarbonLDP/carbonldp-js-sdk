import { Context } from "../Context/Context";
import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { BaseRepository } from "../Repository/BaseRepository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";
export interface BaseGeneralRepository<MODEL extends ResolvablePointer = ResolvablePointer> extends BaseRepository {
    $context: Context<MODEL & RegisteredPointer, MODEL>;
}
