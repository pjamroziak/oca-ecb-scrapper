import { WrongConfigError } from '@app/errors/config.error';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ScrapperEnvironmentVariables } from './config.model';

const validateConfig = (
  config: Record<string, unknown>,
): ScrapperEnvironmentVariables => {
  const validatedConfig = plainToClass(ScrapperEnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new WrongConfigError(errors.toString());
  }

  return validatedConfig;
};

export default validateConfig;
