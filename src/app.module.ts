import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Art } from './models/art/art.entity';
import { Comment } from './models/comment/comment.entity';
import { ImportController } from './import/import.controller';
import { ArtService } from './models/art/art.service';
import { CommentService } from './models/comment/comment.service';
import { User } from './models/user/user.entity';
import { UserService } from './models/user/user.service';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forFeature([Art, Comment, User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.pass'),
        database: configService.get('database.name'),
        entities: [Art, Comment, User],
        synchronize: configService.get('database.sync'),
        finally: () => {
          console.log('TYPEORM LOADED');
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, ImportController],
  providers: [AppService, ArtService, CommentService, UserService],
})
export class AppModule {}
