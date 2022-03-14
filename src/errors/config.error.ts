export class WrongConfigError extends Error {
  constructor(msg: string) {
    super(msg);

    Error.captureStackTrace(this);
  }
}
