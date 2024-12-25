import { Request } from 'express';
import  "express-session";
import session from "express-session";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

declare module "express-session" {
  export interface SessionData {
    user: {
      "id":number,
      "login":string,
      "password":string 
    };
  }
}


declare global {
  namespace Express {
    interface Request {
      session?: session.Session & Partial<session.SessionData>;
    }
  }
}