export type EcbJson = {
  'gesmes:Envelope': {
    Cube: {
      Cube: {
        Cube: EcbJsonCurrency[];
      };
    };
  };
};

export type EcbJsonCurrency = {
  ecb_currency: string;
  ecb_rate: string;
};

export class EcbCurrencies {
  public static parse(json: EcbJson) {
    const currencies = json['gesmes:Envelope'].Cube.Cube.Cube;

    const ecbCurrencies = new EcbCurrencies();
    for (const currency of currencies) {
      ecbCurrencies[currency.ecb_currency] = Number(currency.ecb_rate);
    }

    return ecbCurrencies;
  }

  USD: number;
  JPY: number;
  BGN: number;
  CZK: number;
  DKK: number;
  GBP: number;
  HUF: number;
  PLN: number;
  RON: number;
  SEK: number;
  CHF: number;
  ISK: number;
  NOK: number;
  HRK: number;
  TRY: number;
  AUD: number;
  BRL: number;
  CAD: number;
  CNY: number;
  HKD: number;
  IDR: number;
  ILS: number;
  INR: number;
  KRW: number;
  MXN: number;
  MYR: number;
  NZD: number;
  PHP: number;
  SGD: number;
  THB: number;
  ZAR: number;
}
