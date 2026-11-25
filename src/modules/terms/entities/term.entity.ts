import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("terms")
@Index(["userId"])
export class Term {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "date", nullable: true })
  startDate: string | null;

  @Column({ type: "date", nullable: true })
  endDate: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
