import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateQuickStudentDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @Matches(/^09\d{9}$/, {
    message: "شماره موبایل باید با ۰۹ شروع شده و ۱۱ رقم باشد",
  })
  phone: string;
}
