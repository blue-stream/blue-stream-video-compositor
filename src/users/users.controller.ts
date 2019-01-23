import { Request, Response } from 'express';

export class UsersController {
    static get(req: Request, res: Response) {
        res.json(req.body);
    }
}
