import { NextFunction, Request, Response } from 'express';

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', err.stack);

  // 에러는 해당 http status 코드의 JSON 형태로 프론트에 전달됨
  // 지정된게 없다면 500에러로 지정
  res.status(err.status || 500).send({
    status: err.status || 500,
    message: err.message,
  });
}

// eslint-disable-next-line import/prefer-default-export
export { errorHandler };
