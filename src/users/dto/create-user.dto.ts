import { Min, MinLength } from "class-validator"
export class CreateUserDto {
    id: number;
    @MinLength(3)
    name: string;
    @Min(18)
    age: number;
    place: string;
}
