const DEFAULT_HTTP_STATUS_MESSAGES = {
  200: 'OK',
  400: 'BAD REQUESTS',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  409: 'DUPLICATE',
  500: 'INTERNAL SERVER ERROR',
  503: 'TEMPORARY UNAVAILABLE',
}

const createError = (statusCode = 500, message = "INTERNAL SERVER ERROR") => {
  if(!message) message = DEFAULT_HTTP_STATUS_MESSAGES[statusCode];
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const generalErrorHandler = (err, req, res, next) => {
  console.error(err.message);
  res.send({ error: "err" });
}

export {
  createError,
  generalErrorHandler, 
}