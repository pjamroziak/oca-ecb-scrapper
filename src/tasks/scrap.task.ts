import { XmlConverterService } from '@app/services/xml.converter.service';
import { HttpService } from 'nestjs-http-promise';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { EcbCurrencies } from '@app/models/ecb.model';

@Injectable()
export class ScrapTask {
  private readonly logger = new Logger(ScrapTask.name);
  private readonly ecbUrl: string;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly xmlConverterService: XmlConverterService,
  ) {
    this.ecbUrl = configService.get('ECB_XML_URL');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  private async scrap(): Promise<void> {
    const ecbResponse = await this.httpService.get(this.ecbUrl);
    const ecbXml = ecbResponse.data;

    const ecbJson = this.xmlConverterService.parseToJson(ecbXml);
    const ecbCurrencies = EcbCurrencies.parse(ecbJson);
  }
}
