import { EcbJson } from '@app/models/ecb.model';
import { Injectable, Logger } from '@nestjs/common';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

@Injectable()
export class XmlConverterService {
  private readonly logger = new Logger(XmlConverterService.name);
  private readonly parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: 'ecb_',
    });
  }

  public parseToJson(xmlString: string): EcbJson {
    const validationResult = XMLValidator.validate(xmlString);
    if (typeof validationResult !== 'boolean') {
      this.logger.error(JSON.stringify(validationResult));
    }

    return this.parser.parse(xmlString);
  }
}
