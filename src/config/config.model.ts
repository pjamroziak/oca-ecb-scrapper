import { IsString } from 'class-validator';

export class ScrapperEnvironmentVariables {
  @IsString()
  ECB_XML_URL: string;
}
