import { Request, Response } from 'express';

function errorHandler(error: any, req: Request, res: Response) {
  // 터미널에 노란색으로 출력됨.
  console.log('\x1b[33m%s\x1b[0m', error.stack);

  // 에러는 해당 http status 코드의 JSON 형태로 프론트에 전달됨
  // 지정된게 없다면 500에러로 지정
  if (!error.status) {
    res.send({
      status: 500,
      reason: error.message,
    });
  }
  res
    .status(error.status)
    .json({ status: error.status, reason: error.message });
}

// eslint-disable-next-line import/prefer-default-export
export { errorHandler };
