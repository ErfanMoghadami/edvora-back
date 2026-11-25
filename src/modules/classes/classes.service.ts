import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ClassEntity } from "./entities/class.entity";
import { CreateClassDto } from "./dto/create-class.dto";
import { TermsService } from "../terms/terms.service";
import { StudentsService } from "../students/students.service";

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function serialize(cls: ClassEntity) {
  return {
    id: cls.id,
    name: cls.name,
    term: cls.term,
    weekdays: cls.weekdays,
    startTime: cls.startTime,
    endTime: cls.endTime,
    sessionDuration: cls.sessionDuration,
    students: (cls.students ?? []).map((s) => ({
      id: s.id,
      name: s.name,
      phone: s.phone,
    })),
    createdAt: cls.createdAt,
  };
}

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classesRepo: Repository<ClassEntity>,
    private readonly termsService: TermsService,
    private readonly studentsService: StudentsService
  ) {}

  async findAll(userId: string) {
    const classes = await this.classesRepo.find({
      where: { userId },
      relations: { term: true, students: true },
      order: { createdAt: "DESC" },
    });
    return classes.map(serialize);
  }

  async create(userId: string, dto: CreateClassDto) {
    const duration = toMinutes(dto.endTime) - toMinutes(dto.startTime);
    if (duration <= 0) {
      throw new BadRequestException("ساعت پایان باید بعد از ساعت شروع باشد");
    }

    const term = await this.termsService.findById(userId, dto.termId);

    const students = dto.studentIds.length
      ? await this.studentsService.findByIds(userId, dto.studentIds)
      : [];
    if (students.length !== dto.studentIds.length) {
      throw new BadRequestException("یکی از دانش‌آموزان انتخاب‌شده یافت نشد");
    }

    const cls = this.classesRepo.create({
      userId,
      name: dto.name.trim(),
      termId: term.id,
      weekdays: [...dto.weekdays].sort((a, b) => a - b),
      startTime: dto.startTime,
      endTime: dto.endTime,
      sessionDuration: duration,
      students,
    });

    const saved = await this.classesRepo.save(cls);
    saved.term = term;
    return serialize(saved);
  }
}
