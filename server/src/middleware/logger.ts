import { Request, Response, NextFunction } from 'express';

/**
 * Request logger middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Log request
  console.log(`[${timestamp}] ${req.method} ${req.path}`);

  // Log response when finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const statusEmoji = statusCode >= 500 ? '🔴' : statusCode >= 400 ? '🟡' : '🟢';

    console.log(
      `${statusEmoji} [${timestamp}] ${req.method} ${req.path} - ${statusCode} - ${duration}ms`
    );
  });

  next();
};

/**
 * API request details logger
 */
export const detailedLogger = (req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  const details = {
    timestamp,
    method: req.method,
    url: req.url,
    path: req.path,
    query: req.query,
    params: req.params,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.get('user-agent'),
  };

  console.log('📝 Request Details:', JSON.stringify(details, null, 2));

  next();
};

/**
 * Error logger middleware
 */
export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();

  console.error(`[${timestamp}] ❌ Error:`, {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    query: req.query,
    body: req.body,
  });

  next(err);
};
