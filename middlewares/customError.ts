class CustomError extends Error {
  status: number;

  constructor(status: number, message: string | undefined) {
    super(message); // 반드시 호출
    this.status = status;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { CustomError };
