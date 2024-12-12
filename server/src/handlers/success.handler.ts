import { Response } from 'express';

import BaseHandler from './base.handler';

class SuccessHandler extends BaseHandler {
    static ok(res: Response, data: unknown): Response {
        return this.responseConstructor(res, 200, data)
    }
    static created(response: Response, data: unknown): Response {
        return this.responseConstructor(response, 201, data);
    }
    static noContent(response: Response): Response {
        return response.status(204).send();
    }
}

export {SuccessHandler}