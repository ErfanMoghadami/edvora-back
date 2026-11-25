import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassEntity } from "./entities/class.entity";
import { ClassesService } from "./classes.service";
import { ClassesController } from "./classes.controller";
import { TermsModule } from "../terms/terms.module";
import { StudentsModule } from "../students/students.module";

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity]), TermsModule, StudentsModule],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
