import { HttpException, HttpStatus, Logger } from '@nestjs/common';

class StackTrace {
  static get(message?: string) {
    const obj = {} as any;
    Error.captureStackTrace(obj, this.get);
    const logger = new Logger('ReactionService', {
      timestamp: true,
    });

    const originFile = obj.stack.split('\n')[2].split('/');
    const fileName = originFile[originFile.length - 1].split(':')[0];
    const lineNumber = +originFile[originFile.length - 1].split(':')[1];
    const path = obj.stack.split('at ')[2].trim().split(' ')[1].replace('(', '').replace(')', '');

    logger.error(`Message: ${message} - File: ${fileName} - Line: ${lineNumber} - Path: ${path}`);
  }
}

export class ExceptionResponse extends HttpException {
  constructor(status?: HttpStatus, message?: string, data?: any) {
    super(
      {
        status: status ? status : HttpStatus.BAD_REQUEST,
        message: message ? message : 'Dữ liệu không hợp lệ!',
        ...(status !== HttpStatus.INTERNAL_SERVER_ERROR && { data: data || null }),
      },
      status === HttpStatus.INTERNAL_SERVER_ERROR ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK,
    );
  }
}

export class CatchException extends ExceptionResponse {
  constructor(error: any) {
    super(error?.response?.status || HttpStatus.BAD_REQUEST, error.message);
    StackTrace.get(error.message);
  }
}
