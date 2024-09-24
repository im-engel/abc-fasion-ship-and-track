import {Response} from 'express';
import { ERROR_CODE } from './constants';

export const errorResponse = (res: Response, desc: string) => {
    return res.status(ERROR_CODE[desc] ?? 500).send({errors: [desc]})
}
