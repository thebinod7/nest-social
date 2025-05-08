import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'An unexpected error occurred';

    if (exception instanceof Error) {
      status = HttpStatus.BAD_REQUEST;
      message = exception?.message || 'An unexpected error occurred';
    }

    // Handle Prisma errors
    // if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    //   switch (exception.code) {
    //     case 'P2002': // Unique constraint failed
    //       status = HttpStatus.CONFLICT;
    //       message = 'Record already exists!';
    //       break;
    //     case 'P2025': // Record not found
    //       status = HttpStatus.NOT_FOUND;
    //       message = 'Record could not be found!';
    //       break;
    //     default:
    //       message = 'A database error occurred!';
    //       break;
    //   }
    // }
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }

    response.status(status).json({
      status: false,
      statusCode: status,
      result: exception,
      message,
    });
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    const statusCode = response.statusCode;

    return {
      status: true,
      statusCode,
      result: res,
    };
  }
}
