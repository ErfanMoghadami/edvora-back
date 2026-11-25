import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { TermsService } from "./terms.service";
import { CreateTermDto } from "./dto/create-term.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Controller("terms")
export class TermsController {
  constructor(private readonly termsService: TermsService) {}

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.termsService.findAll(user.id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateTermDto) {
    return this.termsService.create(user.id, dto);
  }
}
