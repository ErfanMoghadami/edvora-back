import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Term } from "../../terms/entities/term.entity";
import { Student } from "../../students/entities/student.entity";

@Entity("classes")
@Index(["userId"])
export class ClassEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  userId: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "uuid" })
  termId: string;

  @ManyToOne(() => Term, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "termId" })
  term: Term;

  /** 0 = شنبه ... 6 = جمعه */
  @Column({ type: "int", array: true })
  weekdays: number[];

  /** HH:mm */
  @Column({ type: "varchar", length: 5 })
  startTime: string;

  /** HH:mm */
  @Column({ type: "varchar", length: 5 })
  endTime: string;

  /** دقیقه؛ از اختلاف شروع و پایان محاسبه می‌شود */
  @Column({ type: "int" })
  sessionDuration: number;

  @ManyToMany(() => Student)
  @JoinTable({
    name: "class_students",
    joinColumn: { name: "classId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "studentId", referencedColumnName: "id" },
  })
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
