import { body, validationResult } from 'express-validator';

const regValidator = [
    body('email', 'The email is not valid').isEmail(),
    body('password', 'Password must be between 4 and 12 characters').isLength({min: 4, max: 12}),

    (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.json({error: error.array()});
        }
        next();
    }
];

export {regValidator};