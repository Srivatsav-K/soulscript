import { Request, Response } from "express";

export type Controller = (req: Request, res: Response) => Promise<void>;

export interface UserDetailsRequest extends Request {
  user?: Record<string, any>;
}
