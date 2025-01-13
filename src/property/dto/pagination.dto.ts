import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    @IsNumber()
    @IsPositive()
    @IsOptional()
    skip: number; // number of record to skip

    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit: number; //maximun number of record to return per query

}