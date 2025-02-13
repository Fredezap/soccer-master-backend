import { check } from 'express-validator'

const validateToken = check('authorization')
    .exists().withMessage('Missing Authorization Header')
    .bail()
    .isString().withMessage('Invalid token format')
    .bail()
    .isLength({ min: 20 }).withMessage('Invalid token length')

export default validateToken