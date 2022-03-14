import { CacheModule, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import validateConfig from '@app/config/config.validate';
import { ScrapTask } from '@app/tasks/scrap.task';
import { XmlConverterService } from '@app/services/xml.converter.service';
import { HttpModule } from 'nestjs-http-promise';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateConfig }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [ScrapTask, XmlConverterService],
})
export class AppModule {}
