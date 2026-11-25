import 'pg';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { User } from './modules/users/entities/user.entity';
import { Student } from './modules/students/entities/student.entity';
import { Session } from './modules/sessions/entities/session.entity';
import { Payment } from './modules/payments/entities/payment.entity';
import { Term } from './modules/terms/entities/term.entity';
import { ClassEntity } from './modules/classes/entities/class.entity';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { StudentsModule } from './modules/students/students.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ShareModule } from './modules/share/share.module';
import { AdminModule } from './modules/admin/admin.module';
import { TermsModule } from './modules/terms/terms.module';
import { ClassesModule } from './modules/classes/classes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        ssl: config.get<string>('DB_SSL') === 'true',
        entities: [User, Student, Session, Payment, Term, ClassEntity],
        synchronize: config.get<string>('DB_SYNC') === 'true',
        logging: false,
      }),
    }),

    UsersModule,
    AuthModule,
    StudentsModule,
    SessionsModule,
    PaymentsModule,
    ShareModule,
    AdminModule,
    TermsModule,
    ClassesModule,
  ],
})
export class AppModule {}
