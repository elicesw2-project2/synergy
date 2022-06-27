import express from 'express';

declare global {
  namespace Express {
    interface Request {
      currentUserId?: Record<string, any>;
    }
  }
}
