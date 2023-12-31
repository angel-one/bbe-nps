import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { NpsModule } from './modules/nps/nps.module';
const port = parseInt(process.env.DB_PORT) || 1433;

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: port,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadModels: true,
      logging: true,
     dialectOptions: { options: { encrypt: false } },
    }),
    DatabaseModule,
    NpsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
