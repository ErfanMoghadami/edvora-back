import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

import { ClassesService } from "./classes.service";
import { CreateClassDto } from "./dto/create-class.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { User } from "../users/entities/user.entity";

@UseGuards(JwtAuthGuard)
@Controller("classes")
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.classesService.findAll(user.id);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateClassDto) {
    return this.classesService.create(user.id, dto);
  }
}
