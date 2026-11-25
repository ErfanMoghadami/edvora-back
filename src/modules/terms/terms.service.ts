import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Term } from "./entities/term.entity";
import { CreateTermDto } from "./dto/create-term.dto";

@Injectable()
export class TermsService {
  constructor(
    @InjectRepository(Term)
    private readonly termsRepo: Repository<Term>
  ) {}

  findAll(userId: string): Promise<Term[]> {
    return this.termsRepo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async findById(userId: string, id: string): Promise<Term> {
    const term = await this.termsRepo.findOne({ where: { id, userId } });
    if (!term) {
      throw new NotFoundException("ترم یافت نشد");
    }
    return term;
  }

  async create(userId: string, dto: CreateTermDto): Promise<Term> {
    const name = dto.name.trim();

    const exists = await this.termsRepo.findOne({ where: { userId, name } });
    if (exists) {
      throw new ConflictException("ترمی با این نام قبلاً ثبت شده است");
    }

    const term = this.termsRepo.create({
      userId,
      name,
      startDate: null,
      endDate: null,
    });
    return this.termsRepo.save(term);
  }
}
