import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CreateClassDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsUUID()
  termId: string;

  @IsArray()
  @ArrayMinSize(1, { message: "حداقل یک روز هفته انتخاب کنید" })
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(6, { each: true })
  weekdays: number[];

  @IsString()
  @Matches(TIME_REGEX, { message: "ساعت شروع نامعتبر است" })
  startTime: string;

  @IsString()
  @Matches(TIME_REGEX, { message: "ساعت پایان نامعتبر است" })
  endTime: string;

  @IsArray()
  @ArrayUnique()
  @IsUUID("all", { each: true })
  studentIds: string[];
}
